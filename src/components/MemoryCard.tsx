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
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 max-w-md ${
          index % 2 === 0 ? "ml-8" : "mr-8"
        }`}
        onClick={() => onMemoryClick(memory)}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-2 rounded-full ${getTypeColor(
                memory.type,
                isDarkMode
              )}`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                  {memory.title}
                </h3>
                <div>
                  <img
                    className="w-30 h-30 rounded-lg object-cover"
                    src={memory.media}
                    alt={memory.title}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(memory.id);
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    memory.isFavorite
                      ? "text-yellow-500 hover:text-yellow-600"
                      : isDarkMode
                      ? "text-gray-400 hover:text-yellow-500"
                      : "text-gray-300 hover:text-yellow-500"
                  }`}>
                  <Star
                    className={`w-4 h-4 ${
                      memory.isFavorite ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                {formatDate(memory.date)}
              </p>
            </div>
          </div>
          <p
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } line-clamp-2`}>
            {memory.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`inline-block px-3 py-1 ${
                isDarkMode
                  ? "bg-amber-800 text-amber-200"
                  : "bg-amber-100 text-amber-800"
              } text-xs rounded-full`}>
              {memory.category}
            </span>
            {memory.tags &&
              memory.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block px-2 py-1 ${
                    isDarkMode
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-100 text-gray-600"
                  } text-xs rounded-full`}>
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Timeline dot */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDarkMode ? "bg-rose-400" : "bg-rose-500"
          } border-4 ${
            isDarkMode ? "border-gray-800" : "border-white"
          } rounded-full shadow-lg ${
            index % 2 === 0 ? "-right-10" : "-left-10"
          }`}></div>
      </div>
    </div>
  );
};
