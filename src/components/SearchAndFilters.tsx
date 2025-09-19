import { useState } from "react";
import { Search, Filter, X, Download, BarChart3 } from "lucide-react";
import type { MemoryType, MemoryCategory } from "../types/Memory";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: MemoryType | "all";
  onTypeChange: (type: MemoryType | "all") => void;
  selectedCategory: MemoryCategory | "all";
  onCategoryChange: (category: MemoryCategory | "all") => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onExport: () => void;
  onShowStats: () => void;
  isDarkMode?: boolean;
}

const memoryTypes: {
  value: MemoryType | "all";
  label: string;
  emoji: string;
}[] = [
  { value: "all", label: "הכל", emoji: "📝" },
  { value: "milestone", label: "אבני דרך", emoji: "🎯" },
  { value: "photo", label: "תמונות", emoji: "📸" },
  { value: "video", label: "סרטונים", emoji: "🎥" },
  { value: "story", label: "סיפורים", emoji: "📖" },
  { value: "audio", label: "הקלטות", emoji: "🎵" },
];

const categories: { value: MemoryCategory | "all"; label: string }[] = [
  { value: "all", label: "כל הקטגוריות" },
  { value: "בילויים", label: "בילויים" },
  { value: "משפחה", label: "משפחה" },
  { value: "נסיעות", label: "נסיעות" },
  { value: "הישגים", label: "הישגים" },
  { value: "אירועי חיים", label: "אירועי חיים" },
];

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onExport,
  onShowStats,
  isDarkMode = false,
}: SearchAndFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-6 mb-8`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? "text-gray-400" : "text-gray-400"
          } w-5 h-5`}
        />
        <input
          type="text"
          placeholder="חיפוש זכרונות..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pr-10 pl-4 py-3 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-rose-400"
              : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-rose-500"
          } focus:outline-none transition-colors`}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle and Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}>
            <Filter className="w-4 h-4" />
            מסננים
          </button>

          <button
            onClick={onToggleFavoritesOnly}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showFavoritesOnly
                ? isDarkMode
                  ? "bg-yellow-600 text-white"
                  : "bg-yellow-500 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}>
            ⭐ מועדפים בלבד
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShowStats}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-colors`}>
            <BarChart3 className="w-4 h-4" />
            סטטיסטיקות
          </button>

          <button
            onClick={onExport}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-green-700 text-white hover:bg-green-600"
                : "bg-green-500 text-white hover:bg-green-600"
            } transition-colors`}>
            <Download className="w-4 h-4" />
            יצוא
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Memory Types */}
            <div>
              <h4
                className={`font-medium mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}>
                סוג זכרון
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {memoryTypes.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => onTypeChange(value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedType === value
                        ? isDarkMode
                          ? "bg-rose-700 text-white"
                          : "bg-rose-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                    <span>{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4
                className={`font-medium mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}>
                קטגוריה
              </h4>
              <div className="space-y-2">
                {categories.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onCategoryChange(value)}
                    className={`block w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === value
                        ? isDarkMode
                          ? "bg-amber-700 text-white"
                          : "bg-amber-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
