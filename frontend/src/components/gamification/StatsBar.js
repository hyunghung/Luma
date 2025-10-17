// frontend/src/components/gamification/StatsBar.jsx
import React from 'react';
import { Trophy, Zap } from 'lucide-react';

const StatsBar = ({ stats }) => {
  const xpPercentage = (stats.xp / stats.xpToNextLevel) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-lg p-6 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-500/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            Level {stats.level}
          </h2>
          <p className="text-sm text-cyan-300">
            Quest Progress: {stats.totalCompleted} Completed
          </p>
        </div>
        <Trophy className="w-16 h-16 text-yellow-400" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-cyan-300">
          <span>XP: {stats.xp} / {stats.xpToNextLevel}</span>
          <span>{Math.floor(xpPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 border border-cyan-400">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;