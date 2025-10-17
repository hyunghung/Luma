// frontend/src/components/common/Navbar.jsx
import React from 'react';
import { authService } from '../../services/authService';

const Navbar = ({ user, onLogout }) => {
  const handleLogout = () => {
    authService.logout();
    if (onLogout) onLogout();
  };

  return (
    <div className="bg-gray-900 shadow-lg border-b-2 border-cyan-400">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          ✨ TaskQuest
        </h1>
        <div className="flex gap-4">
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                Welcome, <strong className="text-cyan-400">{user.username}</strong>!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;