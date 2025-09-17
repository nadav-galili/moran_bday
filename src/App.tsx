import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./App.css";

// Components
import { MemoryCard } from "./components/MemoryCard";
import { MemoryModal } from "./components/MemoryModal";

import { StatsModal } from "./components/StatsModal";
import { DarkModeToggle } from "./components/DarkModeToggle";

// Types and utilities
import type { Memory } from "./types/Memory";
import { filterMemoriesByDecade } from "./utils/memoryUtils";
import { useDarkMode } from "./hooks/useDarkMode";

const sampleMemories: Memory[] = [
  {
    id: "1",
    date: new Date("1985-09-24"),
    title: "יום ההולדת הראשון שלך",
    description: "התחלת המסע המדהים הזה - יום שבו הלב שלנו התמלא באור חדש.",
    type: "milestone",
    category: "אירועי חיים",
    isFavorite: true,
    tags: ["יום הולדת", "התחלות"],
  },
  {
    id: "2",
    date: new Date("2005-06-20"),
    title: "הפגישה הראשונה",
    description:
      "היום שבו פגשנו לראשונה. מי היה יודע שזה יהיה תחילתו של סיפור אהבה כל כך יפה?",
    type: "photo",
    media: "/photos/first-meeting.svg",
    category: "יחסים",
    isFavorite: true,
    tags: ["אהבה", "פגישה ראשונה", "רומנטיקה"],
  },
  {
    id: "3",
    date: new Date("2008-09-14"),
    title: "החתונה שלנו",
    description: "היום הכי יפה בחיים שלנו - התחלנו את המסע המשותף שלנו כמשפחה.",
    type: "photo",
    media: "/photos/wedding.jpg",
    category: "יחסים",
    isFavorite: true,
    tags: ["חתונה", "זוגיות", "שמחה"],
  },
  {
    id: "4",
    date: new Date("2008-09-14"),
    title: "הריקוד הראשון שלנו",
    description: "הריקוד הראשון שלנו כזוג נשוי - רגע קסום שנשאר בלב לתמיד.",
    type: "video",
    media: "/videos/wedding-dance.mp4",
    category: "יחסים",
    isFavorite: true,
    tags: ["חתונה", "ריקוד", "רומנטיקה"],
  },
  {
    id: "5",
    date: new Date("2009-02-14"),
    title: "השיר שלנו",
    description: "השיר שתמיד מזכיר לנו את ההתחלה היפה שלנו יחד.",
    type: "audio",
    audioPath: "/audio/love-song.mp3",
    category: "יחסים",
    isFavorite: true,
    tags: ["מוזיקה", "אהבה", "זכרונות"],
  },
  {
    id: "6",
    date: new Date("2012-04-03"),
    title: "לידת הילד הראשון",
    description: "הרגע שבו הפכנו להורים. הרגש הכי עז שחווינו אי פעם.",
    type: "milestone",
    category: "משפחה",
    isFavorite: true,
    tags: ["לידה", "הורות", "ילדים"],
  },
  {
    id: "7",
    date: new Date("2013-08-15"),
    title: "זמן משפחתי",
    description: "רגעים יפים עם כל המשפחה. התחלת מסורות חדשות עם הילדים.",
    type: "photo",
    media: "/photos/family-time.svg",
    category: "משפחה",
    isFavorite: true,
    tags: ["משפחה", "ילדים", "מסורות"],
  },
  {
    id: "8",
    date: new Date("2015-12-08"),
    title: "נסיעה לאירופה",
    description:
      "החופשה הרומנטית הראשונה שלנו בזוגיות. זכרונות שחרוטים בלב לתמיד.",
    type: "photo",
    media: "/photos/europe-trip.svg",
    category: "נסיעות",
    isFavorite: false,
    tags: ["חופשה", "אירופה", "רומנטיקה"],
  },
  {
    id: "9",
    date: new Date("2018-11-22"),
    title: "קידום בעבודה",
    description:
      "הרגע שבו כל העבודה הקשה שלך הובילה להישג הגדול הזה. כל כך גאה בך!",
    type: "milestone",
    category: "הישגים",
    isFavorite: false,
    tags: ["קריירה", "הישגים", "עבודה"],
  },
  {
    id: "10",
    date: new Date("2020-03-01"),
    title: "ברכות יום הולדת מהמשפחה",
    description: "ברכות חמות ומלאות אהבה מכל המשפחה ליום הולדתך המיוחד.",
    type: "audio",
    audioPath: "/audio/birthday-wishes.mp3",
    category: "משפחה",
    isFavorite: false,
    tags: ["יום הולדת", "משפחה", "ברכות"],
  },
  {
    id: "11",
    date: new Date("2021-05-20"),
    title: "יום הולדת 36",
    description: "חגיגה מיוחדת עם כל האנשים שאני הכי אוהבת.",
    type: "video",
    media: "/videos/birthday-36.mp4",
    category: "אירועי חיים",
    isFavorite: false,
    tags: ["יום הולדת", "חגיגה", "שמחה"],
  },
  {
    id: "12",
    date: new Date("2022-07-10"),
    title: "סיפורי משפחה",
    description:
      "הקלטה של סיפורים מתוקים על החיים שלנו יחד, שנרצה לזכור לתמיד.",
    type: "audio",
    audioPath: "/audio/family-stories.mp3",
    category: "משפחה",
    isFavorite: true,
    tags: ["סיפורים", "משפחה", "זכרונות"],
  },
  {
    id: "13",
    date: new Date("2023-07-10"),
    title: "הסיפור שלנו",
    description:
      "כתבתי לך את הסיפור של האהבה שלנו. כל מילה כתובה מהלב, כל זכרון שמור בנפש.",
    type: "story",
    category: "יחסים",
    isFavorite: true,
    tags: ["סיפור", "אהבה", "זכרונות"],
  },
  {
    id: "14",
    date: new Date("2024-01-15"),
    title: "חגיגת יום הולדת מיוחדת",
    description: "התחלה של שנה חדשה עם כל הרגעים הטובים שעוד בדרך.",
    type: "photo",
    media: "/photos/wedding.jpg",
    category: "אירועי חיים",
    isFavorite: true,
    tags: ["יום הולדת", "חגיגה", "שנה חדשה"],
  },
  {
    id: "15",
    date: new Date("1995-06-15"),
    title: "סיום התיכון",
    description: "הסיום של תקופה ותחילת דרך חדשה מלאה באפשרויות.",
    type: "photo",
    media: "/photos/graduation.svg",
    category: "הישגים",
    isFavorite: false,
    tags: ["סיום", "לימודים", "הישגים"],
  },
];

const decades = ["1980s", "1990s", "2000s", "2010s", "2020s"];

function App() {
  // State management
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [currentDecade, setCurrentDecade] = useState("2000s");

  const [showStatsModal, setShowStatsModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Get current decade memories
  const getCurrentDecadeMemories = () => {
    return filterMemoriesByDecade(memories, currentDecade);
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
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-rose-900"
          : "bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50"
      }`}
      dir="rtl">
      {/* Dark Mode Toggle */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1
            className={`text-5xl font-bold mb-4 ${
              isDarkMode ? "text-rose-200" : "text-rose-800"
            }`}>
            שביל הזכרונות שלנו
          </h1>
          <p
            className={`text-2xl mb-2 ${
              isDarkMode ? "text-rose-300" : "text-rose-600"
            }`}>
            ליום הולדתך-40 המיוחד 💕
          </p>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-amber-200" : "text-amber-700"
            }`}>
            מסע בזמן דרך כל הרגעים היפים, הזכרונות המתוקים והאהבה הגדולה שלנו
          </p>
        </header>
        {/* Search and Filters
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
          onExport={handleExport}
          onShowStats={() => setShowStatsModal(true)}
          isDarkMode={isDarkMode}
        /> */}
        {/* Results Summary */}

        {/* Decade Navigation */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={() => navigateDecade("prev")}
            disabled={decades.indexOf(currentDecade) === 0}
            className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? "bg-rose-800 hover:bg-rose-700 text-rose-200"
                : "bg-rose-200 hover:bg-rose-300 text-rose-700"
            }`}>
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="mx-6 text-center">
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-rose-200" : "text-rose-800"
              }`}>
              שנות ה{currentDecade.slice(0, 4)}
            </h2>
            <div className="flex gap-2 mt-2 justify-center flex-wrap">
              {decades.map((decade) => (
                <button
                  key={decade}
                  onClick={() => scrollToDecade(decade)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    decade === currentDecade
                      ? isDarkMode
                        ? "bg-rose-600 text-white"
                        : "bg-rose-600 text-white"
                      : isDarkMode
                      ? "bg-rose-800 text-rose-200 hover:bg-rose-700"
                      : "bg-rose-200 text-rose-700 hover:bg-rose-300"
                  }`}>
                  {decade}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateDecade("next")}
            disabled={decades.indexOf(currentDecade) === decades.length - 1}
            className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? "bg-rose-800 hover:bg-rose-700 text-rose-200"
                : "bg-rose-200 hover:bg-rose-300 text-rose-700"
            }`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div
            className={`absolute right-1/2 transform translate-x-1/2 w-1 rounded-full ${
              isDarkMode
                ? "bg-gradient-to-b from-rose-500 to-amber-500"
                : "bg-gradient-to-b from-rose-400 to-amber-400"
            }`}
            style={{ height: "calc(100% - 2rem)" }}></div>

          <div className="space-y-8">
            {getCurrentDecadeMemories().length === 0 ? (
              <div
                className={`text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                <p className="text-xl">אין זכרונות מתאימים בעשור זה</p>
                <p className="mt-2">נסה לשנות את הסינון או לבחור עשור אחר</p>
              </div>
            ) : (
              getCurrentDecadeMemories().map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onMemoryClick={setSelectedMemory}
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
          className={`text-center mt-16 pt-8 border-t ${
            isDarkMode ? "border-rose-800" : "border-rose-200"
          }`}>
          <p
            className={`text-lg mb-2 ${
              isDarkMode ? "text-rose-300" : "text-rose-600"
            }`}>
            💕 נוצר באהבה ליום הולדתך -40 המיוחד! 💕
          </p>
          <p className={`${isDarkMode ? "text-amber-300" : "text-amber-700"}`}>
            כל זכרון כאן הוא חלק מהסיפור הנפלא שלנו יחד 🎂✨
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
