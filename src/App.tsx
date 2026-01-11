import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VelocityCard } from './components/VelocityCard';
import { LiveFeed } from './components/LiveFeed';
import { SentimentGauge } from './components/SentimentGauge';
import { TechStack } from './components/TechStack';
import { HistoricalCard } from './components/HistoricalCard';
import { fetchTopStories, fetchHistoricalStory, extractTechStack, calculateSentiment } from './services/hnApi';
import type { HNStory } from './services/hnApi';

export default function App() {
  const [timeframe, setTimeframe] = useState('24h');
  const [search, setSearch] = useState('');
  const [stories, setStories] = useState<HNStory[]>([]);
  const [historicalStory, setHistoricalStory] = useState<HNStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [topData, histData] = await Promise.all([
          fetchTopStories(12),
          fetchHistoricalStory().catch(() => null)
        ]);
        
        if (topData.length > 0) setStories(topData);
        if (histData) setHistoricalStory(histData);
      } catch (err) {
        console.error("Protocol failure:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeframe]);

  const filteredStories = stories.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const techStack = extractTechStack(stories);
  const sentiment = calculateSentiment(stories);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] animate-pulse">Initializing Protocol...</p>
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
          search={search} 
          setSearch={setSearch} 
          timeframe={timeframe} 
          setTimeframe={setTimeframe} 
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[200px]">
          {/* Top Story / Velocity Hero */}
          {filteredStories.length > 0 && <VelocityCard story={filteredStories[0]} />}

          {/* Live Stream */}
          <LiveFeed stories={filteredStories.slice(1)} />

          {/* Sentiment Gauge */}
          <SentimentGauge sentiment={sentiment} />

          {/* Tech Trends */}
          <TechStack topics={techStack} />

          {/* Historical context */}
          {historicalStory && <HistoricalCard story={historicalStory} />}
        </div>

        {/* Global Stats / Footer Meta */}
        <footer className="mt-20 py-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex items-center gap-16">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-2">Total Packets</span>
                <span className="text-lg font-['JetBrains_Mono'] font-bold text-zinc-500 tabular-nums tracking-tighter">
                  {stories.length > 0 ? (stories[0].id).toLocaleString() : '---'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-2">Protocol Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-lg font-['JetBrains_Mono'] font-bold text-white tracking-tighter uppercase">Encrypted</span>
                </div>
              </div>
           </div>
           
           <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] font-['JetBrains_Mono']">
             HN.RADAR // BLACK-BOX-SYSTEM
           </div>
        </footer>
      </div>
    </div>
  );
}
