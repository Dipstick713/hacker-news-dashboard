import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { VelocityCard } from './components/VelocityCard';
import { LiveFeed } from './components/LiveFeed';
import { SentimentGauge } from './components/SentimentGauge';
import { TechStack } from './components/TechStack';
import { HistoricalCard } from './components/HistoricalCard';
import { fetchTopStories, fetchHistoricalStory, extractTechStack, calculateSentiment } from './services/hnApi';
import { analyzeStoriesWithGroq } from './services/aiService';
import type { AIAnalysis } from './services/aiService';
import type { HNStory } from './services/hnApi';

export default function App() {
  const [timeframe, setTimeframe] = useState('24h');
  const [stories, setStories] = useState<HNStory[]>([]);
  const [historicalStory, setHistoricalStory] = useState<HNStory | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // Rate limit: Prevent refreshing more than once every 5 seconds
      const now = Date.now();
      if (now - lastFetchTime < 5000 && !loading) {
        console.warn("Rate limit: Refresh throttled.");
        return;
      }

      setLoading(true);
      setLastFetchTime(now);
      try {
        // Fetch top stories first (critical for initial render)
        const topData = await fetchTopStories(12, timeframe);
        
        if (topData.length > 0) {
          setStories(topData);
          setLoading(false); // Reveal the dashboard as soon as stories are ready

          // Non-blocking secondary fetches
          Promise.all([
            fetchHistoricalStory().then(setHistoricalStory),
            analyzeStoriesWithGroq(topData.map(s => s.title)).then(setAiAnalysis)
          ]).catch(err => console.error("Secondary focus failure:", err));
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Protocol failure:", err);
        setLoading(false);
      }
    };
    loadData();
  }, [timeframe]);


  const techStack = useMemo(() => {
    if (aiAnalysis && aiAnalysis.tags.length > 0) {
      return aiAnalysis.tags.map(t => ({ 
        name: t.name, 
        trend: t.trend
      }));
    }
    return extractTechStack(stories);
  }, [aiAnalysis, stories]);

  const sentiment = useMemo(() => {
    if (aiAnalysis) {
      return [
        { label: 'Excited', value: aiAnalysis.sentiment.excited, color: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
        { label: 'Skeptical', value: aiAnalysis.sentiment.skeptical, color: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
      ];
    }
    return calculateSentiment(stories);
  }, [aiAnalysis, stories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] animate-pulse"></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-['Inter'] text-zinc-300 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Background radial gradient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-orange-500/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-[1600px] mx-auto">
        <Header 
          timeframe={timeframe} 
          setTimeframe={setTimeframe} 
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:auto-rows-[200px]">
          {/* Top Story / Velocity Hero */}
          {stories.length > 0 && (
            <VelocityCard 
              story={stories[0]} 
              summary={aiAnalysis?.executiveSummary} 
              trajectory={aiAnalysis?.trajectory}
              intensity={aiAnalysis?.intensity}
            />
          )}

          {/* Live Stream */}
          <LiveFeed stories={stories.slice(1)} />

          {/* Sentiment Gauge */}
          <SentimentGauge 
            sentiment={sentiment} 
            description={aiAnalysis?.sentiment.description} 
          />

          {/* Tech Trends */}
          <TechStack topics={techStack} />

          {/* Historical context */}
          {historicalStory && <HistoricalCard story={historicalStory} />}
        </div>

        {/* Global Stats / Footer Meta */}
        <footer className="mt-20 py-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-2">Total Packets</span>
                <span className="text-lg font-['JetBrains_Mono'] font-bold text-zinc-500 tabular-nums tracking-tighter">
                  {stories.length > 0 ? (stories[0].id).toLocaleString() : '---'}
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-2">Protocol Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-lg font-['JetBrains_Mono'] font-bold text-white tracking-tighter uppercase">Encrypted</span>
                </div>
              </div>
           </div>
           
           <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] font-['JetBrains_Mono'] text-center">
             HN.DASHBOARD // BLACK-BOX-SYSTEM
           </div>
        </footer>
      </div>
    </div>
  );
}
