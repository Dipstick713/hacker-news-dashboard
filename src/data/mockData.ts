export const MOCK_STORIES = [
  { id: 1, title: 'DeepSeek-V3: Open-Source 671B Parameter Model', points: 2840, comments: 412, author: 'ycombinator', time: '2h ago', velocity: 45, history: [10, 15, 8, 25, 45, 38, 52, 60, 58, 70] },
  { id: 2, title: 'Rust 2024 Edition is now stable', points: 1250, comments: 189, author: 'rustlang', time: '4h ago', velocity: 30 },
  { id: 3, title: 'The case for boring technology in 2026', points: 890, comments: 245, author: 'johndoe', time: '6h ago', velocity: 15 },
  { id: 4, title: 'PostgreSQL 18: Everything new', points: 760, comments: 112, author: 'dbninja', time: '8h ago', velocity: 12 },
  { id: 5, title: 'A new way to build React dashboards', points: 640, comments: 90, author: 'reactfan', time: '10h ago', velocity: 8 },
];

export const HISTORICAL_STORY = {
  title: 'Apple releases the first M1 Mac mini',
  time: '5 years ago',
  points: 12400,
  comments: 2100,
  domain: 'apple.com'
};

export const TOPICS = [
  { name: 'LLMs', trend: '+24%' },
  { name: 'TypeScript', trend: '+12%' },
  { name: 'Rust', trend: '+8%' },
  { name: 'Svelte', trend: '+5%' },
  { name: 'Docker', trend: '-2%' },
];

export const SENTIMENT = [
  { label: 'Excited', value: 30, color: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
  { label: 'Skeptical', value: 70, color: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
];
