import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import "./App.css";

// Components
import { MemoryCard } from "./components/MemoryCard";
import { MemoryModal } from "./components/MemoryModal";
import { StatsModal } from "./components/StatsModal";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { ConfettiEffect } from "./components/ConfettiEffect";

// Types and utilities
import type { Memory } from "./types/Memory";
import { filterMemoriesByDecade } from "./utils/memoryUtils";
import { useDarkMode } from "./hooks/useDarkMode";
import { myMemories } from "./lib/memories";

const decades = ["2010s", "2020s"];

function App() {
  // State management
  const [memories, setMemories] = useState<Memory[]>(myMemories);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [currentDecade, setCurrentDecade] = useState("2010s");

  const [showStatsModal, setShowStatsModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current decade memories
  const getCurrentDecadeMemories = () => {
    return filterMemoriesByDecade(memories, currentDecade);
  };

  // Audio management
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5; // Set volume to 50%

      // Try to play the audio
      const playAudio = async () => {
        try {
          await audio.play();
          setIsMusicPlaying(true);
        } catch {
          console.log("Autoplay blocked, music will start on user interaction");
          setIsMusicPlaying(false);
        }
      };

      playAudio();
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
        setIsMusicPlaying(false);
      } else {
        audio.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Navigation handlers
  const navigateDecade = (direction: "prev" | "next") => {
    const currentIndex = decades.indexOf(currentDecade);
    if (direction === "prev" && currentIndex > 0) {
      setCurrentDecade(decades[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < decades.length - 1) {
      setCurrentDecade(decades[currentIndex + 1]);
    }
  };

  // Confetti handlers
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Memory handlers
  const handleToggleFavorite = (memoryId: string) => {
    setMemories((prev) =>
      prev.map((memory) =>
        memory.id === memoryId
          ? { ...memory, isFavorite: !memory.isFavorite }
          : memory
      )
    );

    // Update selected memory if it's currently open
    if (selectedMemory && selectedMemory.id === memoryId) {
      setSelectedMemory((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }

    // Trigger confetti for favorites
    triggerConfetti();
  };

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    // Trigger confetti when opening a memory
    triggerConfetti();
  };

  // Smooth scroll to decade
  const scrollToDecade = (decade: string) => {
    setCurrentDecade(decade);
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100"
      }`}
      dir="rtl">
      {/* Dark Mode Toggle */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className={`fixed top-2 left-2 sm:top-4 sm:left-4 z-50 p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
            : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white"
        }`}
        title={isMusicPlaying ? "Mute Music" : "Play Music"}>
        {isMusicPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/lovesong.mp3"
        preload="auto"
        loop
        style={{ display: "none" }}
      />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12 relative">
          {/* Confetti Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-5 sm:top-10 left-1/4 w-1 sm:w-2 h-1 sm:h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}></div>
            <div
              className="absolute top-10 sm:top-20 right-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}></div>
            <div
              className="absolute top-8 sm:top-16 left-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}></div>
            <div
              className="absolute top-12 sm:top-24 right-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}></div>
            <div
              className="absolute top-6 sm:top-12 left-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}></div>
          </div>

          <h1
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse ${
              isDarkMode ? "drop-shadow-lg" : ""
            }`}>
            🎉 שביל הזכרונות שלנו 🎉
          </h1>
          <div className="flex justify-center my-3 sm:my-4">
            <div className="border-4 sm:border-5 border-pink-500 rounded-lg flex items-center justify-center">
              <img
                src="/photos/queen.png"
                alt="queen"
                className="rounded-lg w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-82 lg:h-82"
              />
            </div>
          </div>
          <p
            className={`text-lg sm:text-2xl md:text-3xl mb-2 font-semibold px-2 ${
              isDarkMode ? "text-pink-200" : "text-pink-600"
            }`}>
            ליום הולדתך-40 המיוחד 💕🎂✨
          </p>
          <p
            className={`text-sm sm:text-lg md:text-xl max-w-2xl mx-auto px-2 ${
              isDarkMode ? "text-purple-200" : "text-purple-700"
            }`}>
            מסע בזמן דרך כל הרגעים היפים, הזכרונות המתוקים והאהבה הגדולה שלנו
            🌈💖
          </p>
        </header>

        {/* Decade Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          {/* Mobile: Stack navigation buttons above title */}
          <div className="flex items-center gap-4 sm:hidden">
            <button
              onClick={() => navigateDecade("prev")}
              disabled={decades.indexOf(currentDecade) === 0}
              className={`p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-110 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                  : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white"
              }`}>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateDecade("next")}
              disabled={decades.indexOf(currentDecade) === decades.length - 1}
              className={`p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-110 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                  : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white"
              }`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop: Side navigation buttons */}
          <button
            onClick={() => navigateDecade("prev")}
            disabled={decades.indexOf(currentDecade) === 0}
            className={`hidden sm:block p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-110 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white"
            }`}>
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="mx-4 sm:mx-8 text-center">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent ${
                isDarkMode ? "drop-shadow-lg" : ""
              }`}>
              שנות ה{currentDecade.slice(0, 4)} 🎂
            </h2>
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 justify-center flex-wrap">
              {decades.map((decade) => (
                <button
                  key={decade}
                  onClick={() => scrollToDecade(decade)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                    decade === currentDecade
                      ? isDarkMode
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                        : "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : isDarkMode
                      ? "bg-gradient-to-r from-purple-700 to-pink-700 text-purple-200 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gradient-to-r from-pink-200 to-purple-200 text-purple-700 hover:from-pink-300 hover:to-purple-300"
                  }`}>
                  {decade}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateDecade("next")}
            disabled={decades.indexOf(currentDecade) === decades.length - 1}
            className={`hidden sm:block p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-110 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white"
            }`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div
            className={`absolute right-1/2 transform translate-x-1/2 w-1 sm:w-2 rounded-full shadow-lg ${
              isDarkMode
                ? "bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500"
                : "bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-400"
            }`}
            style={{ height: "calc(100% - 2rem)" }}></div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {getCurrentDecadeMemories().length === 0 ? (
              <div
                className={`text-center py-8 sm:py-12 px-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                <p className="text-lg sm:text-xl">
                  אין זכרונות מתאימים בעשור זה
                </p>
                <p className="mt-2 text-sm sm:text-base">
                  נסה לשנות את הסינון או לבחור עשור אחר
                </p>
              </div>
            ) : (
              getCurrentDecadeMemories().map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onMemoryClick={handleMemoryClick}
                  onToggleFavorite={handleToggleFavorite}
                  isDarkMode={isDarkMode}
                />
              ))
            )}
          </div>
        </div>
        {/* Memory Detail Modal */}
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onToggleFavorite={handleToggleFavorite}
            isDarkMode={isDarkMode}
          />
        )}
        {/* Stats Modal */}
        {showStatsModal && (
          <StatsModal
            memories={memories}
            onClose={() => setShowStatsModal(false)}
            isDarkMode={isDarkMode}
          />
        )}
        {/* Footer */}
        <footer
          className={`text-center mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t-2 px-4 ${
            isDarkMode
              ? "border-gradient-to-r from-pink-500 to-purple-500"
              : "border-gradient-to-r from-pink-300 to-purple-300"
          }`}>
          <div className="relative">
            {/* Floating hearts animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 left-1/4 text-lg sm:text-xl md:text-2xl animate-bounce"
                style={{ animationDelay: "0s" }}>
                💖
              </div>
              <div
                className="absolute top-1 sm:top-2 right-1/4 text-base sm:text-lg md:text-xl animate-bounce"
                style={{ animationDelay: "0.7s" }}>
                💕
              </div>
              <div
                className="absolute top-0 sm:top-1 left-1/2 text-sm sm:text-base md:text-lg animate-bounce"
                style={{ animationDelay: "1.4s" }}>
                💝
              </div>
            </div>

            <p
              className={`text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent ${
                isDarkMode ? "drop-shadow-lg" : ""
              }`}>
              💕 נוצר באהבה ליום הולדתך -40 המיוחד! 💕
            </p>
            <p
              className={`text-sm sm:text-base md:text-lg ${
                isDarkMode ? "text-purple-200" : "text-purple-600"
              }`}>
              כל זכרון כאן הוא חלק מהסיפור הנפלא שלנו יחד 🎂✨🌈
            </p>
          </div>
        </footer>
      </div>

      {/* Confetti Effect */}
      <ConfettiEffect isActive={showConfetti} />
    </div>
  );
}

export default App;
