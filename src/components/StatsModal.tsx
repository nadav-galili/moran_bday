import type { Memory } from '../types/Memory';
import { getMemoryStats } from '../utils/memoryUtils';
import { X, Heart, Camera, Video, FileText, Mic, Star } from 'lucide-react';

interface StatsModalProps {
  memories: Memory[];
  onClose: () => void;
  isDarkMode?: boolean;
}

export const StatsModal = ({ memories, onClose, isDarkMode = false }: StatsModalProps) => {
  const stats = getMemoryStats(memories);

  const typeIcons = {
    milestone: Heart,
    photo: Camera,
    video: Video,
    story: FileText,
    audio: Mic
  };

  const typeLabels = {
    milestone: 'אבני דרך',
    photo: 'תמונות',
    video: 'סרטונים',
    story: 'סיפורים',
    audio: 'הקלטות'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              📊 סטטיסטיקות זכרונות
            </h2>
            <button
              onClick={onClose}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} hover:bg-gray-100 rounded-full p-2`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {stats.total}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                סך הכל זכרונות
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} flex items-center gap-1`}>
                <Star className="w-5 h-5 fill-current" />
                {stats.favorites}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-yellow-800'}`}>
                זכרונות מועדפים
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {Object.keys(stats.byDecade).length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-green-800'}`}>
                עשורים
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {Object.keys(stats.byCategory).length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-purple-800'}`}>
                קטגוריות
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Memory Types */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                לפי סוג זכרון
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.byType).map(([type, count]) => {
                  const IconComponent = typeIcons[type as keyof typeof typeIcons];
                  const percentage = ((count / stats.total) * 100).toFixed(1);
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {typeLabels[type as keyof typeof typeLabels]}
                        </span>
                      </div>
                      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold">{count}</span>
                        <span className="text-sm">({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                לפי קטגוריה
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.byCategory).map(([category, count]) => {
                  const percentage = ((count / stats.total) * 100).toFixed(1);
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {category}
                      </span>
                      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold">{count}</span>
                        <span className="text-sm">({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decades */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} md:col-span-2`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                זכרונות לפי עשורים
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(stats.byDecade).sort().map(([decade, count]) => (
                  <div key={decade} className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className={`text-xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                      {count}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      שנות ה{decade.replace('s', '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className={`px-8 py-3 ${isDarkMode ? 'bg-rose-700 hover:bg-rose-800' : 'bg-rose-600 hover:bg-rose-700'} text-white rounded-full transition-colors`}
            >
              סגור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};