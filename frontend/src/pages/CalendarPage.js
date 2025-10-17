// pages/CalendarPage.jsx
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const CalendarPage = ({ 
  calendarEvents, 
  setCalendarEvents, 
  selectedDate, 
  setSelectedDate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [newEvent, setNewEvent] = useState({ title: '', date: selectedDate, time: '', description: '' });
  const [showEventForm, setShowEventForm] = useState(false);

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  // Add event
  const addCalendarEvent = () => {
    if (!newEvent.title.trim()) return;
    const event = {
      id: Date.now().toString(),
      ...newEvent
    };
    setCalendarEvents([...calendarEvents, event]);
    setNewEvent({ title: '', date: selectedDate, time: '', description: '' });
    setShowEventForm(false);
  };

  // Delete event
  const deleteCalendarEvent = (id) => {
    setCalendarEvents(calendarEvents.filter(e => e.id !== id));
  };

  // Get events for date
  const getEventsForDate = (dateString) => {
    return calendarEvents.filter(e => e.date === dateString);
  };

  // Render month view
  const renderMonthView = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-800 bg-opacity-30"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          className={`h-24 bg-gray-800 bg-opacity-50 border border-gray-700 p-2 cursor-pointer hover:bg-gray-700 hover:bg-opacity-50 transition-all ${
            isToday ? 'ring-2 ring-cyan-400' : ''
          }`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className={`text-sm font-bold mb-1 ${isToday ? 'text-cyan-400' : 'text-gray-300'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div key={event.id} className="text-xs bg-blue-600 bg-opacity-70 rounded px-1 py-0.5 truncate">
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-400">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-400" />
          </button>
          <h3 className="text-2xl font-bold text-cyan-400">{monthName}</h3>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-cyan-400" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-gray-400 text-sm py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    );
  };

  const eventsForDate = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-cyan-400">
            <Calendar className="w-8 h-8" />
            Quest Calendar
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCalendarView('month')}
              className={`px-4 py-2 rounded-lg transition-all ${
                calendarView === 'month' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCalendarView('week')}
              className={`px-4 py-2 rounded-lg transition-all ${
                calendarView === 'week' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCalendarView('year')}
              className={`px-4 py-2 rounded-lg transition-all ${
                calendarView === 'year' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {calendarView === 'month' && renderMonthView()}
        {calendarView === 'week' && <p className="text-gray-400 text-center py-8">Week view - Coming soon!</p>}
        {calendarView === 'year' && <p className="text-gray-400 text-center py-8">Year view - Coming soon!</p>}

        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>

        {showEventForm && (
          <div className="bg-gray-800 rounded-lg p-4 mt-4 space-y-3 border-2 border-gray-700">
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Event title"
              className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Description (optional)"
              className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={addCalendarEvent}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Event
              </button>
              <button
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-lg text-cyan-400">Events for {selectedDate}</h3>
          {eventsForDate.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No events for this day</p>
          ) : (
            eventsForDate.map(event => (
              <div key={event.id} className="bg-blue-900 bg-opacity-50 border-2 border-blue-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg text-blue-300">{event.title}</h4>
                  <button
                    onClick={() => deleteCalendarEvent(event.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {event.time && (
                  <p className="text-sm text-gray-400 mb-1">⏰ {event.time}</p>
                )}
                {event.description && (
                  <p className="text-sm text-gray-300">{event.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;