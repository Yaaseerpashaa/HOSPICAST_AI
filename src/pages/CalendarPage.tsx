import React, { useState } from 'react';
import BackgroundPattern from '../components/BackgroundPattern';
import { useTheme } from '../hooks/useTheme';
import { ChevronLeft, ChevronRight, Clock, UserCircle, Users } from 'lucide-react';

// Days of the week header
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Sample events for the calendar
const events = [
  { id: 1, title: 'Staff Meeting', day: 1, start: '08:00', end: '09:00', attendees: 12, type: 'meeting' },
  { id: 2, title: 'Dr. Johnson Surgery', day: 1, start: '10:00', end: '13:00', attendees: 4, type: 'surgery' },
  { id: 3, title: 'Nurse Shift Change', day: 1, start: '15:00', end: '16:00', attendees: 8, type: 'shift' },
  { id: 4, title: 'ICU Rounds', day: 2, start: '09:00', end: '11:00', attendees: 5, type: 'rounds' },
  { id: 5, title: 'Board Meeting', day: 2, start: '14:00', end: '16:00', attendees: 7, type: 'meeting' },
  { id: 6, title: 'Emergency Training', day: 3, start: '10:00', end: '12:00', attendees: 15, type: 'training' },
  { id: 7, title: 'Department Heads Call', day: 4, start: '11:00', end: '12:00', attendees: 6, type: 'meeting' },
  { id: 8, title: 'Cardiac Surgery', day: 4, start: '08:00', end: '12:00', attendees: 6, type: 'surgery' },
  { id: 9, title: 'New Equipment Training', day: 5, start: '13:00', end: '15:00', attendees: 10, type: 'training' },
  { id: 10, title: 'Nurse Staff Meeting', day: 5, start: '16:00', end: '17:00', attendees: 20, type: 'meeting' },
];

// Get the current month and year
const getCurrentMonthYear = () => {
  const date = new Date();
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
};

// Get the number of days in a month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get the first day of the month
const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const CalendarPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDate, setCurrentDate] = useState(getCurrentMonthYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  
  const daysInMonth = getDaysInMonth(currentDate.month, currentDate.year);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.month, currentDate.year);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(prev => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year
    }));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(prev => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year
    }));
    setSelectedDay(null);
  };

  const getDayEvents = (day: number) => {
    return events.filter(event => event.day === day);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'surgery': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'shift': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rounds': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'training': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Hospital Calendar
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Schedule management for staff, surgeries, and hospital events
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar section */}
            <div className="lg:col-span-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-gray-100 dark:border-gray-700">
              {/* Month navigation */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={prevMonth} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {monthNames[currentDate.month]} {currentDate.year}
                </h2>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center font-medium text-gray-700 dark:text-gray-300 py-2">
                    {day.substring(0, 3)}
                  </div>
                ))}

                {/* Empty cells for days before the first day of month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-20 p-1 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-lg" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dayEvents = getDayEvents(day);
                  const isSelected = selectedDay === day;
                  
                  return (
                    <div 
                      key={`day-${day}`} 
                      className={`h-20 p-1 border overflow-hidden relative rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setSelectedDay(day)}
                    >
                      <div className="text-right font-medium text-gray-900 dark:text-white p-1">
                        {day}
                      </div>
                      <div className="overflow-hidden max-h-[calc(100%-1.5rem)]">
                        {dayEvents.slice(0, 2).map(event => (
                          <div key={event.id} className={`text-xs px-1 py-0.5 mb-1 truncate rounded ${getEventTypeColor(event.type)}`}>
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 px-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events Panel */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                {selectedDay ? (
                  <span>Events on {monthNames[currentDate.month]} {selectedDay}</span>
                ) : (
                  <span>Select a day to view events</span>
                )}
              </h3>

              {selectedDay ? (
                <div className="space-y-3">
                  {getDayEvents(selectedDay).length > 0 ? (
                    getDayEvents(selectedDay).map(event => (
                      <div 
                        key={event.id} 
                        className={`p-3 rounded-lg ${getEventTypeColor(event.type)} border border-current border-opacity-20`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="flex justify-between text-sm mt-1">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {event.start} - {event.end}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3.5 h-3.5 mr-1" />
                            {event.attendees}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600 dark:text-gray-400 text-sm italic">
                      No events scheduled for this day
                    </div>
                  )}

                  {/* Add Event Button */}
                  <button className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Add New Event
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                  <UserCircle className="w-12 h-12 mb-2" />
                  <p>Please select a day on the calendar to view or add events</p>
                </div>
              )}

              {/* Event Types Legend */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Types</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Meetings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Surgery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Shifts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Rounds</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Training</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage; 