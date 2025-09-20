import type { Memory } from "../types/Memory";
import { getTypeIcon, getTypeColor, formatDate } from "../utils/memoryUtils";
import { Star } from "lucide-react";

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
  onToggleFavorite: (memoryId: string) => void;
  isDarkMode?: boolean;
}

export const MemoryModal = ({
  memory,
  onClose,
  onToggleFavorite,
  isDarkMode = false,
}: MemoryModalProps) => {
  const IconComponent = getTypeIcon(memory.type);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-lg border border-purple-500/30"
            : "bg-gradient-to-br from-pink-50/95 to-purple-50/95 backdrop-blur-lg border border-pink-300/50"
        } rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto transform hover:scale-105 transition-transform duration-300`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-full ${getTypeColor(
                  memory.type,
                  isDarkMode
                )} transform hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <h2
                    className={`text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent ${
                      isDarkMode ? "drop-shadow-lg" : ""
                    }`}>
                    {memory.title}
                  </h2>
                  <button
                    onClick={() => onToggleFavorite(memory.id)}
                    className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                      memory.isFavorite
                        ? "text-yellow-400 hover:text-yellow-300 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg"
                        : isDarkMode
                        ? "text-purple-300 hover:text-yellow-400 bg-gradient-to-br from-purple-800 to-pink-800 hover:from-yellow-800 hover:to-yellow-700"
                        : "text-purple-400 hover:text-yellow-500 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-yellow-100 hover:to-yellow-200"
                    }`}>
                    <Star
                      className={`w-6 h-6 ${
                        memory.isFavorite ? "fill-current animate-pulse" : ""
                      }`}
                    />
                  </button>
                </div>
                <p
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-purple-200" : "text-purple-600"
                  }`}>
                  {formatDate(memory.date)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`${
                isDarkMode
                  ? "text-purple-300 hover:text-white bg-purple-800/50 hover:bg-purple-700/50"
                  : "text-purple-500 hover:text-purple-700 bg-purple-100/50 hover:bg-purple-200/50"
              } text-3xl font-bold rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg`}>
              ×
            </button>
          </div>

          {memory.media && (
            <div className="mb-6 flex justify-center items-center">
              {memory.type === "photo" ? (
                <div className="relative">
                  <img
                    src={memory.media}
                    alt={memory.title}
                    className="object-cover rounded-2xl max-w-full max-h-96 mx-auto shadow-2xl border-4 border-pink-300/50 transform hover:scale-105 transition-transform duration-300"
                  />
                  {/* Decorative frame */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl opacity-20 -z-10"></div>
                </div>
              ) : memory.type === "video" ? (
                <div className="relative">
                  <video
                    src={memory.media}
                    controls
                    className="w-full h-64 rounded-2xl shadow-2xl border-4 border-pink-300/50"
                  />
                  {/* Decorative frame */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl opacity-20 -z-10"></div>
                </div>
              ) : null}
            </div>
          )}

          {memory.audioPath && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-2xl p-4 shadow-lg">
                <audio controls className="w-full">
                  <source src={memory.audioPath} type="audio/mpeg" />
                  הדפדפן שלך לא תומך בהשמעת קבצי אודיו.
                </audio>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p
              className={`${
                isDarkMode ? "text-purple-100" : "text-gray-800"
              } leading-relaxed text-xl font-medium`}>
              {memory.description}
            </p>
          </div>

          {memory.tags && memory.tags.length > 0 && (
            <div className="mb-6">
              <h4
                className={`text-lg font-bold mb-3 ${
                  isDarkMode ? "text-purple-200" : "text-purple-600"
                }`}>
                תגיות: 🏷️
              </h4>
              <div className="flex flex-wrap gap-3">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block px-4 py-2 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-purple-700 to-pink-700 text-purple-200"
                        : "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700"
                    } text-sm font-semibold rounded-full shadow-md transform hover:scale-105 transition-transform duration-300`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span
              className={`inline-block px-6 py-3 ${
                isDarkMode
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
              } text-lg font-bold rounded-full transform hover:scale-105 transition-transform duration-300`}>
              {memory.category}
            </span>
            <button
              onClick={onClose}
              className={`px-8 py-3 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400"
              } text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg`}>
              סגור ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
