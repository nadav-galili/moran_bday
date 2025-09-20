export interface Memory {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: "milestone" | "photo" | "video" | "story" | "audio";
  media?: string;
  audioPath?: string;
  category: "בילויים" | "משפחה" | "נסיעות" | "חתונה" | "אירועי חיים" | "טוני";
  isFavorite?: boolean;
  tags?: string[];
}

export type MemoryType = Memory["type"];
export type MemoryCategory = Memory["category"];
