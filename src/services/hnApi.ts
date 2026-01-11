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

export const fetchTopStories = async (limit: number = 20): Promise<HNStory[]> => {
  try {
    const res = await fetch(`${BASE_URL}/topstories.json`);
    const ids: number[] = await res.json();
    
    // Fetch a batch to ensure we get enough valid stories
    const storyPromises = ids.slice(0, limit * 2).map(id => fetchStoryDetails(id));
    const results = await Promise.all(storyPromises);
    
    return results
      .filter((s): s is HNStory => s !== null && !!s.title)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching HN stories:', error);
    return [];
  }
};

export const fetchHistoricalStory = async (): Promise<HNStory> => {
  const FALLBACK_STORY: HNStory = {
    id: 1,
    title: 'The Hacker News Launch',
    points: 1337,
    comments: 42,
    author: 'pg',
    time: '19 years ago',
    url: 'https://news.ycombinator.com',
    domain: 'ycombinator.com',
    velocity: 0,
    history: [10, 20, 30, 40, 50]
  };

  try {
    let attempts = 0;
    while (attempts < 20) {
      // Probing popular stories from the mid-20M range (2019-2020 era)
      const randomOldId = Math.floor(Math.random() * 5000000) + 18000000;
      const story = await fetchStoryDetails(randomOldId);
      if (story && (story.points || 0) > 100) return story;
      attempts++;
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
  const results = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => ({
      name,
      trend: `${Math.floor(Math.random() * 20) + 5}%`
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
