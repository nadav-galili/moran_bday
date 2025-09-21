import type { Memory } from "../types/Memory";
import { getTypeIcon, getTypeColor, formatDate } from "../utils/memoryUtils";
import { Star } from "lucide-react";

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onMemoryClick: (memory: Memory) => void;
  onToggleFavorite: (memoryId: string) => void;
  isDarkMode?: boolean;
}

export const MemoryCard = ({
  memory,
  index,
  onMemoryClick,
  onToggleFavorite,
  isDarkMode = false,
}: MemoryCardProps) => {
  const IconComponent = getTypeIcon(memory.type);

  return (
    <div
      className={`flex items-center ${
        index % 2 === 0 ? "justify-end" : "justify-start"
      }`}>
      <div
        className={`relative ${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm border border-purple-500/30"
            : "bg-gradient-to-br from-pink-50/90 to-purple-50/90 backdrop-blur-sm border border-pink-300/50"
        } rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-110 hover:rotate-1 max-w-md sm:max-w-lg ${
          index % 2 === 0 ? "ml-4 sm:ml-8" : "mr-4 sm:mr-8"
        }`}
        onClick={() => onMemoryClick(memory)}>
        <div className="p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div
              className={`p-2 sm:p-3 rounded-full shadow-lg ${getTypeColor(
                memory.type,
                isDarkMode
              )} transform hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg sm:text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent truncate`}>
                    {memory.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-purple-200" : "text-purple-600"
                    }`}>
                    {formatDate(memory.date)}
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <img
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 m-1 sm:m-3 rounded-xl object-cover shadow-lg border-2 border-pink-300/50 transform hover:scale-105 transition-transform duration-300"
                    src={memory.media}
                    alt={memory.title}
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-bl-lg"></div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(memory.id);
                  }}
                  className={`p-1 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${
                    memory.isFavorite
                      ? "text-yellow-400 hover:text-yellow-300 bg-yellow-100/50"
                      : isDarkMode
                      ? "text-purple-300 hover:text-yellow-400 bg-purple-800/50 hover:bg-yellow-800/50"
                      : "text-purple-400 hover:text-yellow-500 bg-purple-100/50 hover:bg-yellow-100/50"
                  }`}>
                  <Star
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      memory.isFavorite ? "fill-current animate-pulse" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <p
            className={`${
              isDarkMode ? "text-purple-100" : "text-gray-700"
            } line-clamp-2 text-sm sm:text-base leading-relaxed`}>
            {memory.description}
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
            <span
              className={`inline-block px-2 sm:px-4 py-1 sm:py-2 ${
                isDarkMode
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
              } text-xs sm:text-sm font-semibold rounded-full transform hover:scale-105 transition-transform duration-300`}>
              {memory.category}
            </span>
            {memory.tags &&
              memory.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block px-2 sm:px-3 py-1 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-purple-700 to-pink-700 text-purple-200"
                      : "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700"
                  } text-xs sm:text-sm rounded-full shadow-md transform hover:scale-105 transition-transform duration-300`}>
                  #{tag}
                </span>
              ))}
          </div>
        </div>

        {/* Timeline dot */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 ${
            isDarkMode
              ? "bg-gradient-to-br from-pink-400 to-purple-400"
              : "bg-gradient-to-br from-pink-500 to-purple-500"
          } border-2 sm:border-4 ${
            isDarkMode ? "border-purple-900" : "border-white"
          } rounded-full shadow-xl animate-pulse ${
            index % 2 === 0 ? "-right-6 sm:-right-12" : "-left-6 sm:-left-12"
          }`}>
          {/* Inner glow effect */}
          <div className="absolute inset-0.5 sm:inset-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
