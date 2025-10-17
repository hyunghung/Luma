// frontend/src/components/gamification/LevelUpNotification.jsx
import React, { useEffect } from 'react';

const LevelUpNotification = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg shadow-2xl animate-bounce">
      <p className="text-xl font-bold">{message}</p>
    </div>
  );
};

export default LevelUpNotification;