import { dataRateLimiter } from '../utils/rateLimiter';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export interface HNStory {
  id: number;
  title: string;
  points: number;
  comments: number;
  author: string;
  time: string;
  url?: string;
  domain?: string;
  velocity?: number;
  history?: number[];
}

const formatTimeAgo = (timestamp: number): string => {
  if (!timestamp) return '---';
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const getDomain = (url?: string): string => {
  if (!url) return 'news.ycombinator.com';
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
};

export const fetchStoryDetails = async (id: number): Promise<HNStory | null> => {
  try {
    const res = await fetch(`${BASE_URL}/item/${id}.json`);
    const data = await res.json();
    
    if (!data || data.deleted || data.dead) return null;

    return {
      id: data.id,
      title: data.title || 'Untitled Protocol',
      points: data.score || 0,
      comments: data.descendants || 0,
      author: data.by || 'anonymous',
      time: formatTimeAgo(data.time),
      url: data.url,
      domain: getDomain(data.url),
      velocity: Math.floor(Math.random() * 50) + 5, 
      history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    };
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    return null;
  }
};

let lastStories: HNStory[] = [];

export const fetchTopStories = async (limit: number = 20, timeframe: string = '24h'): Promise<HNStory[]> => {
  if (!(await dataRateLimiter.checkLimit()) && lastStories.length > 0) {
    return lastStories;
  }

  try {
    // Determine the timestamp for filtering
    const now = Math.floor(Date.now() / 1000);
    let seconds = 86400; // default 24h
    
    if (timeframe === '1h') seconds = 3600;
    if (timeframe === '7d') seconds = 604800;
    
    const startTime = now - seconds;

    // Use Algolia for timeframe-based search as Firebase doesn't support it well
    const res = await fetch(`https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>${startTime}&hitsPerPage=${limit}`);
    const data = await res.json();
    
    if (data.hits && data.hits.length > 0) {
      lastStories = data.hits.map((hit: any) => ({
        id: parseInt(hit.objectID),
        title: hit.title || 'Untitled Protocol',
        points: hit.points || 0,
        comments: hit.num_comments || 0,
        author: hit.author || 'anonymous',
        time: formatTimeAgo(hit.created_at_i),
        url: hit.url,
        domain: getDomain(hit.url),
        velocity: Math.floor(Math.random() * 50) + 5, 
        history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
      }));
      return lastStories;
    }

    // Fallback to Firebase if Algolia fails or returns nothing
    const fbRes = await fetch(`${BASE_URL}/topstories.json`);
    const ids: number[] = await fbRes.json();
    const storyPromises = ids.slice(0, limit).map(id => fetchStoryDetails(id));
    const results = await Promise.all(storyPromises);
    
    lastStories = results.filter((s): s is HNStory => s !== null && !!s.title);
    return lastStories;
  } catch (error) {
    console.error('Error fetching HN stories:', error);
    return [];
  }
};

export const fetchHistoricalStory = async (): Promise<HNStory> => {
  const FALLBACK_STORY: HNStory = {
    id: 1,
    title: 'Arc High-Fidelity Black Protocol Dashboard V1.0',
    points: 1337,
    comments: 42,
    author: 'arc_architect',
    time: 'Launch',
    url: 'https://news.ycombinator.com',
    domain: 'black-protocol.io',
    velocity: 99,
    history: [10, 20, 40, 60, 80, 100, 90, 85, 95, 110]
  };

  try {
    // Optimization: Use Algolia to find a random high-scoring historical story
    // This is significantly faster than the previous brute-force method
    const randomPage = Math.floor(Math.random() * 100);
    const res = await fetch(`https://hn.algolia.com/api/v1/search?tags=story&numericFilters=points>500&page=${randomPage}&hitsPerPage=1`);
    const data = await res.json();
    
    if (data.hits && data.hits.length > 0) {
      const hit = data.hits[0];
      return {
        id: parseInt(hit.objectID),
        title: hit.title,
        points: hit.points,
        comments: hit.num_comments,
        author: hit.author,
        time: formatTimeAgo(hit.created_at_i),
        url: hit.url,
        domain: getDomain(hit.url),
        velocity: Math.floor(Math.random() * 30) + 5,
        history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
      };
    }
    return FALLBACK_STORY;
  } catch (err) {
    console.warn("Using fallback historical story", err);
    return FALLBACK_STORY;
  }
};

export const extractTechStack = (stories: HNStory[]) => {
  const keywords = ['AI', 'Rust', 'TypeScript', 'React', 'Python', 'LLM', 'Docker', 'Svelte', 'Go', 'Apple', 'Linux', 'Database', 'Cloud', 'Secure'];
  const counts: Record<string, number> = {};
  
  if (!stories.length) return [];

  stories.forEach(story => {
    keywords.forEach(kw => {
      if (story.title.toLowerCase().includes(kw.toLowerCase())) {
        counts[kw] = (counts[kw] || 0) + 1;
      }
    });
  });

  // Ensure we always have some tags if the feed is sparse
  const fallback = [{ name: 'Protocol', trend: '+12%' }, { name: 'Network', trend: '+8%' }];
  // Use a more deterministic "trend" based on the frequency
  const results = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      trend: `+${8 + count * 2}%`
    }));

  return results.length > 0 ? results : fallback;
};

export const calculateSentiment = (stories: HNStory[]) => {
  if (!stories.length) return [
    { label: 'Neutral', value: 50, color: 'bg-zinc-500' },
    { label: 'Analyzing', value: 50, color: 'bg-zinc-700' }
  ];

  const totalPoints = stories.reduce((sum, s) => sum + (s.points || 0), 0);
  const totalComments = stories.reduce((sum, s) => sum + (s.comments || 0), 0);
  const ratio = totalComments / (totalPoints || 1);
  
  const skepticalValue = Math.min(Math.max(Math.floor(ratio * 300), 20), 80);
  const excitedValue = 100 - skepticalValue;

  return [
    { label: 'Excited', value: excitedValue, color: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
    { label: 'Skeptical', value: skepticalValue, color: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
  ];
};
