import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const DarkModeToggle = ({
  isDarkMode,
  onToggle,
}: DarkModeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-2 right-2 sm:top-4 sm:right-4 z-40 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
          : "bg-white hover:bg-gray-50 text-gray-600"
      }`}
      aria-label={isDarkMode ? "מעבר למצב יום" : "מעבר למצב לילה"}>
      {isDarkMode ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
    </button>
  );
};
