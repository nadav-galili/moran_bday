export interface Memory {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'milestone' | 'photo' | 'video' | 'story' | 'audio';
  media?: string;
  audioPath?: string;
  category: 'יחסים' | 'משפחה' | 'נסיעות' | 'הישגים' | 'אירועי חיים';
  isFavorite?: boolean;
  tags?: string[];
}

export type MemoryType = Memory['type'];
export type MemoryCategory = Memory['category'];