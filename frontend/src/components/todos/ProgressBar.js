// components/todos/ProgressBar.jsx
import React from 'react';
import { Target } from 'lucide-react';
import Card from '../common/Card';

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card>
      <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
        <Target className="w-6 h-6" />
        Today's Quest Progress
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>{completed} / {total} quests completed</span>
          <span className="text-cyan-400 font-bold">{Math.floor(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-6 border border-gray-700">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs text-white font-bold">
                {Math.floor(percentage)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressBar;