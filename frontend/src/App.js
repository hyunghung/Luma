// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import Navbar from './components/common/NavBar';
import LevelUpNotification from './components/gamification/LevelUpNotification';
import TodosPage from './pages/TodosPage';
import CalendarPage from './pages/CalendarPage';
import FinancesPage from './pages/FinancesPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('todos');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Reward notification
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const storedUser = authService.getStoredUser();
      setUser(storedUser);
    }
  }, []);

  const handleLoginSuccess = () => {
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const showLevelUpNotification = (message) => {
    setRewardMessage(message);
    setShowReward(true);
  };

  // If not logged in, show login page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <LevelUpNotification
        show={showReward}
        message={rewardMessage}
        onClose={() => setShowReward(false)}
      />

      <Navbar user={user} onLogout={handleLogout} />

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="bg-gray-900 rounded-lg shadow-lg p-2 flex gap-2 border-2 border-gray-800">
          <button
            onClick={() => setCurrentPage('todos')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === 'todos'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            📝 Quests
          </button>
          <button
            onClick={() => setCurrentPage('calendar')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === 'calendar'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setCurrentPage('finances')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentPage === 'finances'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            💰 Finances
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 pb-12">
        {currentPage === 'todos' && (
          <TodosPage onLevelUp={showLevelUpNotification} />
        )}
        {currentPage === 'calendar' && <CalendarPage />}
        {currentPage === 'finances' && <FinancesPage />}
      </div>
    </div>
  );
};

export default App;