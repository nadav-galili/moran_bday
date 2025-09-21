import { useState, useEffect } from "react";

interface BirthdayCakeProps {
  isDarkMode: boolean;
  onCandleBlow?: (candleNumber: number) => void;
}

interface Candle {
  id: number;
  isLit: boolean;
  isBlownOut: boolean;
  flickerDelay: number;
}

export const BirthdayCake = ({
  isDarkMode,
  onCandleBlow,
}: BirthdayCakeProps) => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [blownOutCount, setBlownOutCount] = useState(0);
  const [showWish, setShowWish] = useState<string | null>(null);

  // Initialize 40 candles
  useEffect(() => {
    const initialCandles = Array.from({ length: 40 }, (_, index) => ({
      id: index,
      isLit: true,
      isBlownOut: false,
      flickerDelay: Math.random() * 2000 + 500, // Random flicker between 0.5-2.5s
    }));
    setCandles(initialCandles);
  }, []);

  // Birthday wishes that appear when candles are blown out
  const birthdayWishes = [
    "💕 שנה של אהבה אינסופית! 💕",
    "🎂 40 שנים של יופי ואושר! 🎂",
    "✨ האישה הכי מדהימה בעולם! ✨",
    "🌟 כל יום איתך הוא מתנה! 🌟",
    "💖 האמא והאישה המושלמת! 💖",
    "🎉 40 סיבות לאהוב אותך! 🎉",
    "🌈 השנה הכי מדהימה שלך! 🌈",
    "💐 מלכת הלב שלי! 💐",
  ];

  const handleCandleClick = (candleId: number) => {
    setCandles((prevCandles) =>
      prevCandles.map((candle) =>
        candle.id === candleId
          ? { ...candle, isLit: false, isBlownOut: true }
          : candle
      )
    );

    setBlownOutCount((prev) => {
      const newCount = prev + 1;
      if (newCount % 5 === 0 && newCount <= 40) {
        // Show a wish every 5 candles blown out
        const wishIndex = Math.floor(newCount / 5) - 1;
        if (wishIndex < birthdayWishes.length) {
          setShowWish(birthdayWishes[wishIndex]);
          setTimeout(() => setShowWish(null), 3000);
        }
      }
      return newCount;
    });

    onCandleBlow?.(candleId);
  };

  const resetCandles = () => {
    setCandles((prevCandles) =>
      prevCandles.map((candle) => ({
        ...candle,
        isLit: true,
        isBlownOut: false,
        flickerDelay: Math.random() * 2000 + 500,
      }))
    );
    setBlownOutCount(0);
  };

  return (
    <div className="relative">
      {/* Birthday Wish Popup */}
      {showWish && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl text-center max-w-sm mx-4 ${
              isDarkMode
                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                : "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
            }`}>
            <p className="text-lg sm:text-xl font-bold">{showWish}</p>
          </div>
        </div>
      )}

      {/* Cake Base */}
      <div className="flex justify-center mb-4">
        <div
          className={`relative ${
            isDarkMode
              ? "bg-gradient-to-b from-amber-800 to-amber-900"
              : "bg-gradient-to-b from-amber-300 to-amber-400"
          } rounded-t-3xl px-8 py-6 shadow-xl`}>
          {/* Cake decoration */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full"></div>
          <div className="absolute -top-1 left-1/4 w-6 h-6 bg-purple-500 rounded-full"></div>
          <div className="absolute -top-1 right-1/4 w-6 h-6 bg-pink-400 rounded-full"></div>

          {/* Candles */}
          <div className="grid grid-cols-10 gap-1 mb-2">
            {candles.map((candle) => (
              <div key={candle.id} className="relative">
                {/* Candle */}
                <div
                  className={`w-2 h-8 mx-auto ${
                    isDarkMode
                      ? "bg-gradient-to-t from-pink-600 to-pink-400"
                      : "bg-gradient-to-t from-pink-500 to-pink-300"
                  } rounded-t-full`}></div>

                {/* Flame */}
                {candle.isLit && !candle.isBlownOut && (
                  <div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                    onClick={() => handleCandleClick(candle.id)}
                    style={{
                      animationDelay: `${candle.flickerDelay}ms`,
                    }}>
                    <div className="relative">
                      {/* Flickering flame */}
                      <div className="w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-pulse opacity-90"></div>
                      <div className="absolute top-0 left-0 w-2 h-3 bg-gradient-to-t from-yellow-200 to-orange-300 rounded-full animate-ping opacity-70"></div>

                      {/* Smoke effect when hovering */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                        <div className="w-1 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Blown out candle */}
                {candle.isBlownOut && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    {/* Smoke trail */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-50">
                      <div className="w-0.5 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cake base text */}
          <div className="text-center mt-2">
            <p
              className={`text-xs sm:text-sm font-bold ${
                isDarkMode ? "text-amber-200" : "text-amber-800"
              }`}>
              🎂 Happy 40th Birthday! 🎂
            </p>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetCandles}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
              : "bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-300 hover:to-purple-300"
          } shadow-lg hover:shadow-xl`}>
          🔄 Relight Candles
        </button>
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-2">
        <p
          className={`text-sm ${
            isDarkMode ? "text-purple-200" : "text-purple-600"
          }`}>
          Candles blown out: {blownOutCount}/40
        </p>
        {blownOutCount === 40 && (
          <p
            className={`text-lg font-bold mt-2 ${
              isDarkMode ? "text-yellow-300" : "text-yellow-600"
            } animate-pulse`}>
            🎉 All candles blown out! Make a wish! 🎉
          </p>
        )}
      </div>
    </div>
  );
};
