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
  velocity?: number; // Simulated or calculated
  history?: number[];
}

const formatTimeAgo = (timestamp: number): string => {
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

export const fetchStoryDetails = async (id: number): Promise<HNStory> => {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  const data = await res.json();
  
  return {
    id: data.id,
    title: data.title,
    points: data.score,
    comments: data.descendants || 0,
    author: data.by,
    time: formatTimeAgo(data.time),
    url: data.url,
    domain: getDomain(data.url),
    // For the "Black Protocol" vibe, we simulate some metadata that the API doesn't provide
    velocity: Math.floor(Math.random() * 50) + 5, 
    history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
  };
};

export const fetchTopStories = async (limit: number = 20): Promise<HNStory[]> => {
  try {
    const res = await fetch(`${BASE_URL}/topstories.json`);
    const ids: number[] = await res.json();
    
    const storyPromises = ids.slice(0, limit).map(id => fetchStoryDetails(id));
    return await Promise.all(storyPromises);
  } catch (error) {
    console.error('Error fetching HN stories:', error);
    return [];
  }
};
