// components/gamification/XPBar.jsx
import React from 'react';

const XPBar = ({ currentXP, xpToNextLevel }) => {
  const percentage = (currentXP / xpToNextLevel) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-cyan-300">
        <span>XP: {currentXP} / {xpToNextLevel}</span>
        <span>{Math.floor(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-4 border border-cyan-400">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default XPBar;