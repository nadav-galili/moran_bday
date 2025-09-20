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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full ${getTypeColor(
                  memory.type,
                  isDarkMode
                )}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}>
                    {memory.title}
                  </h2>
                  <button
                    onClick={() => onToggleFavorite(memory.id)}
                    className={`p-2 rounded-full transition-colors ${
                      memory.isFavorite
                        ? "text-yellow-500 hover:text-yellow-600 bg-yellow-50"
                        : isDarkMode
                        ? "text-gray-400 hover:text-yellow-500 bg-gray-700"
                        : "text-gray-300 hover:text-yellow-500 bg-gray-50"
                    }`}>
                    <Star
                      className={`w-5 h-5 ${
                        memory.isFavorite ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                  {formatDate(memory.date)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              } text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center`}>
              ×
            </button>
          </div>

          {memory.media && (
            <div className="mb-4 flex justify-center items-center">
              {memory.type === "photo" ? (
                <img
                  src={memory.media}
                  alt={memory.title}
                  className="object-cover rounded-lg max-w-full max-h-96 mx-auto"
                />
              ) : memory.type === "video" ? (
                <video
                  src={memory.media}
                  controls
                  className="w-full h-64 rounded-lg"
                />
              ) : null}
            </div>
          )}

          {memory.audioPath && (
            <div className="mb-4">
              <audio controls className="w-full">
                <source src={memory.audioPath} type="audio/mpeg" />
                הדפדפן שלך לא תומך בהשמעת קבצי אודיו.
              </audio>
            </div>
          )}

          <div className="mb-4">
            <p
              className={`${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              } leading-relaxed text-lg`}>
              {memory.description}
            </p>
          </div>

          {memory.tags && memory.tags.length > 0 && (
            <div className="mb-4">
              <h4
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-2`}>
                תגיות:
              </h4>
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block px-3 py-1 ${
                      isDarkMode
                        ? "bg-gray-600 text-gray-200"
                        : "bg-gray-100 text-gray-600"
                    } text-sm rounded-full`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span
              className={`inline-block px-4 py-2 ${
                isDarkMode
                  ? "bg-amber-800 text-amber-200"
                  : "bg-amber-100 text-amber-800"
              } rounded-full`}>
              {memory.category}
            </span>
            <button
              onClick={onClose}
              className={`px-6 py-2 ${
                isDarkMode
                  ? "bg-rose-700 hover:bg-rose-800"
                  : "bg-rose-600 hover:bg-rose-700"
              } text-white rounded-full transition-colors`}>
              סגור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
