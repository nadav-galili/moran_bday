import type { Memory, MemoryType, MemoryCategory } from "../types/Memory";
import { Heart, Calendar, Camera, Video, FileText, Mic } from "lucide-react";

export const getTypeIcon = (type: MemoryType) => {
  switch (type) {
    case "milestone":
      return Heart;
    case "photo":
      return Camera;
    case "video":
      return Video;
    case "story":
      return FileText;
    case "audio":
      return Mic;
    default:
      return Calendar;
  }
};

export const getTypeColor = (type: MemoryType, isDarkMode: boolean = false) => {
  const baseColors = {
    milestone: isDarkMode
      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
      : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-lg",
    photo: isDarkMode
      ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg"
      : "bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg",
    video: isDarkMode
      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
      : "bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg",
    story: isDarkMode
      ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg"
      : "bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg",
    audio: isDarkMode
      ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg"
      : "bg-gradient-to-br from-teal-400 to-cyan-400 text-white shadow-lg",
  };
  return (
    baseColors[type] ||
    (isDarkMode
      ? "bg-gradient-to-br from-gray-600 to-gray-500 text-white shadow-lg"
      : "bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-lg")
  );
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const filterMemoriesByDecade = (memories: Memory[], decade: string) => {
  const decadeStart = parseInt(decade.slice(0, 4));
  return memories
    .filter((memory) => {
      const year = memory.date.getFullYear();
      return year >= decadeStart && year < decadeStart + 10;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const searchMemories = (memories: Memory[], query: string) => {
  const lowerQuery = query.toLowerCase();
  return memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(lowerQuery) ||
      memory.description.toLowerCase().includes(lowerQuery) ||
      memory.category.includes(lowerQuery) ||
      (memory.tags &&
        memory.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
  );
};

export const filterMemoriesByType = (
  memories: Memory[],
  type: MemoryType | "all"
) => {
  if (type === "all") return memories;
  return memories.filter((memory) => memory.type === type);
};

export const filterMemoriesByCategory = (
  memories: Memory[],
  category: MemoryCategory | "all"
) => {
  if (category === "all") return memories;
  return memories.filter((memory) => memory.category === category);
};

export const getMemoryStats = (memories: Memory[]) => {
  const stats = {
    total: memories.length,
    byType: {} as Record<MemoryType, number>,
    byCategory: {} as Record<MemoryCategory, number>,
    byDecade: {} as Record<string, number>,
    favorites: memories.filter((m) => m.isFavorite).length,
  };

  memories.forEach((memory) => {
    // Type stats
    stats.byType[memory.type] = (stats.byType[memory.type] || 0) + 1;

    // Category stats
    stats.byCategory[memory.category] =
      (stats.byCategory[memory.category] || 0) + 1;

    // Decade stats
    const decade = Math.floor(memory.date.getFullYear() / 10) * 10;
    const decadeKey = `${decade}s`;
    stats.byDecade[decadeKey] = (stats.byDecade[decadeKey] || 0) + 1;
  });

  return stats;
};

export const exportMemoriesToJSON = (memories: Memory[]) => {
  const dataStr = JSON.stringify(memories, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = `זכרונות-${
    new Date().toISOString().split("T")[0]
  }.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
