import React, { useState, useEffect } from 'react';
import { Clock, Users, MapPin, Download, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  department: string;
  location: string;
  attendees: string[];
  type: 'surgery' | 'meeting' | 'maintenance' | 'training' | 'rounds' | 'shifts';
  color?: string;
}

// Updated events to match the screenshot
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Staff Meeting',
    date: '2025-04-03',
    time: '09:00 AM',
    department: 'Administration',
    location: 'Conference Room A',
    attendees: ['All Department Heads'],
    type: 'meeting',
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'ICU Rounds',
    date: '2025-04-03',
    time: '11:00 AM',
    department: 'ICU',
    location: 'ICU Wing',
    attendees: ['Dr. Patel', 'Dr. Roberts', 'Nursing Staff'],
    type: 'rounds',
    color: '#8b5cf6'
  },
  {
    id: '3',
    title: 'Dr. Johnson Surgery',
    date: '2025-04-03',
    time: '02:00 PM',
    department: 'Surgery',
    location: 'OR 3',
    attendees: ['Dr. Johnson', 'Dr. Lee', 'Surgery Team A'],
    type: 'surgery',
    color: '#ef4444'
  },
  {
    id: '4',
    title: 'Board Meeting',
    date: '2025-04-03',
    time: '04:00 PM',
    department: 'Executive',
    location: 'Board Room',
    attendees: ['Board Members', 'Hospital Admin'],
    type: 'meeting',
    color: '#3b82f6'
  },
  {
    id: '5',
    title: 'Emergency Training',
    date: '2025-04-03',
    time: '01:00 PM',
    department: 'Emergency',
    location: 'Training Center',
    attendees: ['ER Staff', 'New Residents'],
    type: 'training',
    color: '#10b981'
  },
];

interface EventFormData {
  title: string;
  date: string;
  time: string;
  department: string;
  location: string;
  attendees: string;
  type: CalendarEvent['type'];
}

// Type for calendar view options
type CalendarView = 'month' | 'week' | 'day';

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2025-04-16'));
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<string>('April 2025');
  // Add state for calendar view
  const [activeView, setActiveView] = useState<CalendarView>('month');
  const [showNotifications, setShowNotifications] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: selectedDate.toISOString().split('T')[0],
    time: '',
    department: '',
    location: '',
    attendees: '',
    type: 'meeting'
  });

  // Get today's date and upcoming events
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    // Filter events for today and next 3 days
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && eventDate >= currentDate;
  }).sort((a, b) => {
    // Sort by date first
    if (a.date !== b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // Then by time
    const timeA = a.time.includes('AM') ? 
      parseInt(a.time.split(':')[0]) : 
      parseInt(a.time.split(':')[0]) + 12;
    const timeB = b.time.includes('AM') ? 
      parseInt(b.time.split(':')[0]) : 
      parseInt(b.time.split(':')[0]) + 12;
    return timeA - timeB;
  });

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      .react-calendar {
        width: 100%;
        background-color: #1e2a3e;
        border: none;
        border-radius: 0.75rem;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.2;
      }
      
      .react-calendar__navigation {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
      }
      
      .react-calendar__navigation button {
        min-width: 44px;
        background: none;
        font-size: 1rem;
        color: white;
        padding: 0.5rem;
        margin: 0 0.25rem;
      }
      
      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
      }
      
      .react-calendar__navigation button[disabled] {
        opacity: 0.5;
      }
      
      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.75rem;
        padding: 0.5rem 0;
      }
      
      .react-calendar__month-view__weekdays__weekday {
        padding: 0.75rem;
        color: #94a3b8;
        abbr {
          text-decoration: none;
        }
      }
      
      .react-calendar__month-view__days__day {
        color: white !important;
        font-weight: 600 !important;
      }
      
      .react-calendar__tile {
        position: relative;
        height: 80px;
        padding-top: 1rem;
        border-radius: 0;
        background: none;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        font-weight: 600;
      }
      
      .react-calendar__tile:enabled:hover,
      .react-calendar__tile:enabled:focus,
      .react-calendar__tile--active {
        background-color: rgba(59, 130, 246, 0.3);
      }
      
      .react-calendar__tile--now {
        background-color: rgba(59, 130, 246, 0.2);
      }
      
      .react-calendar__month-view__days__day--neighboringMonth {
        color: #64748b !important;
      }
      
      .event-surgery { background-color: rgba(239, 68, 68, 0.2); color: rgb(239, 68, 68); }
      .event-meeting { background-color: rgba(59, 130, 246, 0.2); color: rgb(59, 130, 246); }
      .event-maintenance { background-color: rgba(245, 158, 11, 0.2); color: rgb(245, 158, 11); }
      .event-training { background-color: rgba(16, 185, 129, 0.2); color: rgb(16, 185, 129); }
      .event-rounds { background-color: rgba(139, 92, 246, 0.2); color: rgb(139, 92, 246); }
      .event-shifts { background-color: rgba(236, 72, 153, 0.2); color: rgb(236, 72, 153); }

      /* Selected day highlight */
      .react-calendar__tile--active {
        background-color: rgba(59, 130, 246, 0.5) !important;
        border: 2px solid #3b82f6 !important;
      }

      /* Custom day cell with highlighted current selection */
      .current-day-highlight {
        background-color: #0ea5e9 !important;
        color: white;
        z-index: 1;
      }
      
      /* Active view button styling */
      .view-button-active {
        background-color: #3b82f6 !important;
        color: white !important;
      }

      /* Notification panel styling */
      .notification-panel {
        background-color: rgba(26, 34, 52, 0.95);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.75rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        animation: fadeIn 0.2s ease-out;
      }
      
      .notification-icon {
        filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.5));
        color: #38bdf8;
      }
      
      .notification-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .notification-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    // Update month name when selected date changes
    const options = { month: 'long', year: 'numeric' };
    setCurrentMonth(selectedDate.toLocaleDateString('en-US', options as any));
  }, [selectedDate]);

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  // Function to navigate to previous period
  const handlePreviousPeriod = () => {
    const newDate = new Date(selectedDate);
    
    if (activeView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (activeView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (activeView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setSelectedDate(newDate);
  };

  // Function to navigate to next period
  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    
    if (activeView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (activeView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (activeView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setSelectedDate(newDate);
  };

  // Function to navigate to today
  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  // Function to change view
  const handleViewChange = (view: CalendarView) => {
    setActiveView(view);
  };

  const handleEditEvent = () => {
    if (!selectedEvent) return;
    
    // Pre-fill form with the selected event data
    setFormData({
      title: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      department: selectedEvent.department,
      location: selectedEvent.location,
      attendees: selectedEvent.attendees.join(', '),
      type: selectedEvent.type
    });
    
    setIsEditMode(true);
    setShowAddEvent(true);
    setSelectedEvent(null);
  };

  const handleCloseForm = () => {
    setShowAddEvent(false);
    setIsEditMode(false);
    setFormData({
      title: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '',
      department: '',
      location: '',
      attendees: '',
      type: 'meeting'
    });
  };

  const handleAddEvent = () => {
    if (isEditMode) {
      // Update existing event
      const updatedEvents = events.map(event => {
        if (event.id === selectedEvent?.id) {
          return {
            ...event,
            title: formData.title,
            date: formData.date,
            time: formData.time,
            department: formData.department,
            location: formData.location,
            attendees: formData.attendees.split(',').map(a => a.trim()),
            type: formData.type,
            color: formData.type === 'meeting' ? '#3b82f6' : 
                   formData.type === 'surgery' ? '#ef4444' :
                   formData.type === 'training' ? '#10b981' :
                   formData.type === 'rounds' ? '#8b5cf6' :
                   formData.type === 'maintenance' ? '#f59e0b' : '#ec4899'
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: (events.length + 1).toString(),
        ...formData,
        attendees: formData.attendees.split(',').map(a => a.trim()),
        color: formData.type === 'meeting' ? '#3b82f6' : 
               formData.type === 'surgery' ? '#ef4444' :
               formData.type === 'training' ? '#10b981' :
               formData.type === 'rounds' ? '#8b5cf6' :
               formData.type === 'maintenance' ? '#f59e0b' : '#ec4899'
      };
      setEvents([...events, newEvent]);
    }
    
    handleCloseForm();
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const eventsOnDate = events.filter(event => 
      event.date === date.toISOString().split('T')[0]
    );
    
    return (
      <div className="absolute inset-0 flex flex-col gap-1 p-1 pt-6">
        {eventsOnDate.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`text-xs truncate rounded-sm px-1 py-0.5 event-${event.type} cursor-pointer hover:opacity-80`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedEvent(event);
            }}
            style={{ fontSize: '0.65rem' }}
          >
            {event.title}
          </div>
        ))}
        {eventsOnDate.length > 3 && (
          <div className="text-xs text-gray-400 truncate">
            +{eventsOnDate.length - 3} more
          </div>
        )}
      </div>
    );
  };

  // Day view component
  const DayView = () => {
    const dayEvents = events.filter(
      event => event.date === selectedDate.toISOString().split('T')[0]
    ).sort((a, b) => {
      const timeA = a.time.includes('AM') ? 
        parseInt(a.time.split(':')[0]) : 
        parseInt(a.time.split(':')[0]) + 12;
      const timeB = b.time.includes('AM') ? 
        parseInt(b.time.split(':')[0]) : 
        parseInt(b.time.split(':')[0]) + 12;
      return timeA - timeB;
    });

    // Generate time slots for the day (7 AM to 7 PM)
    const timeSlots = Array.from({ length: 13 }, (_, i) => {
      const hour = i + 7;
      return hour > 12 ? `${hour - 12} PM` : (hour === 12 ? '12 PM' : `${hour} AM`);
    });

    return (
      <div className="p-4 h-full overflow-y-auto max-h-[600px]">
        <h2 className="text-lg font-semibold mb-4">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </h2>
        <div className="space-y-2">
          {timeSlots.map((timeSlot, index) => {
            const eventsAtTime = dayEvents.filter(event => {
              const eventHour = parseInt(event.time.split(':')[0]);
              const eventPeriod = event.time.includes('AM') ? 'AM' : 'PM';
              const slotHour = parseInt(timeSlot.split(' ')[0]);
              const slotPeriod = timeSlot.split(' ')[1];
              return eventHour === slotHour && eventPeriod === slotPeriod;
            });

            return (
              <div key={index} className="flex">
                <div className="w-20 text-gray-400 text-sm pt-2">{timeSlot}</div>
                <div className="flex-1 border-l border-gray-700 pl-3 min-h-[60px]">
                  {eventsAtTime.length > 0 ? (
                    eventsAtTime.map(event => (
                      <div 
                        key={event.id}
                        className={`mb-2 p-2 rounded cursor-pointer event-${event.type}`}
                        style={{ borderLeft: `3px solid ${event.color}` }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-gray-400">
                          {event.time} • {event.location}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full border-b border-dashed border-gray-700"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Week view component
  const WeekView = () => {
    // Get start of the week (Sunday)
    const weekStart = new Date(selectedDate);
    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    // Generate an array of 7 days starting from weekStart
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      return day;
    });

    // Format date string for date comparison
    const formatDateString = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    return (
      <div className="p-2 h-full overflow-x-auto">
        <div className="flex min-w-[900px]">
          {weekDays.map((day, index) => {
            const isToday = formatDateString(day) === formatDateString(new Date());
            const isSelected = formatDateString(day) === formatDateString(selectedDate);
            const dayEvents = events.filter(
              event => event.date === formatDateString(day)
            ).sort((a, b) => {
              const timeA = a.time.includes('AM') ? 
                parseInt(a.time.split(':')[0]) : 
                parseInt(a.time.split(':')[0]) + 12;
              const timeB = b.time.includes('AM') ? 
                parseInt(b.time.split(':')[0]) : 
                parseInt(b.time.split(':')[0]) + 12;
              return timeA - timeB;
            });

            return (
              <div 
                key={index} 
                className={`flex-1 min-w-[120px] border-r border-gray-700 last:border-r-0 ${
                  isSelected ? 'bg-blue-900/20' : ''
                }`}
              >
                <div 
                  className={`text-center p-2 cursor-pointer ${
                    isToday ? 'bg-blue-600' : isSelected ? 'bg-blue-900/40' : ''
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-xs text-gray-400">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold">
                    {day.getDate()}
                  </div>
                </div>
                <div className="p-1 space-y-1 max-h-[500px] overflow-y-auto">
                  {dayEvents.length > 0 ? (
                    dayEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`p-1 text-xs rounded cursor-pointer event-${event.type} truncate`}
                        style={{ borderLeft: `3px solid ${event.color}` }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-80 truncate">{event.time}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-center text-gray-500 py-2">No events</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Month view - using the existing Calendar component
  const MonthView = () => (
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
      tileContent={getTileContent}
      view="month"
      className="w-full"
      minDetail="year"
      nextLabel={null}
      prevLabel={null}
      next2Label={null}
      prev2Label={null}
    />
  );

  // Get events for the currently selected date
  const selectedDateEvents = events.filter(
    event => event.date === selectedDate.toISOString().split('T')[0]
  );

  // Render the current view
  const renderCurrentView = () => {
    switch (activeView) {
      case 'day':
        return <DayView />;
      case 'week':
        return <WeekView />;
      case 'month':
      default:
        return <MonthView />;
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleEventFromNotification = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowNotifications(false);
  };

  // Calculate notification count for today
  const todayEvents = events.filter(event => event.date === formattedToday);
  const notificationCount = todayEvents.length;

  // Ensure we're using the actual events for notifications
  useEffect(() => {
    // Whenever events change, we want to update our components
    // This ensures that newly added events appear in the notifications
    const checkCurrentEvents = () => {
      // Just to trigger a re-render when events change
    };
    checkCurrentEvents();
  }, [events]);

  return (
    <div className="min-h-screen bg-[#1a2234] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <CalendarIcon className="mr-2" size={20} />
              Hospital Calendar
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Schedule management for staff, surgeries, and hospital events</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <button 
                className="relative p-2 rounded-full bg-[#1e3a5f] hover:bg-[#254b7a] text-cyan-300"
                onClick={toggleNotifications}
              >
                <Bell size={22} className="notification-icon" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-[400px] z-50 notification-panel overflow-hidden">
                  <div className="p-5 notification-header">
                    <h3 className="font-semibold text-2xl text-white">Notifications</h3>
                    <p className="text-gray-300 mt-1 text-lg">Today's events and upcoming in 3 days</p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {upcomingEvents.length > 0 ? (
                      <div>
                        {upcomingEvents.map(event => {
                          const isToday = event.date === formattedToday;
                          return (
                            <div 
                              key={event.id}
                              className="p-4 border-b border-gray-700/50 hover:bg-[#1e3a5f] cursor-pointer"
                              onClick={() => handleEventFromNotification(event)}
                            >
                              <div className="flex items-start">
                                <div className={`w-3 h-3 mt-1.5 rounded-full mr-3 flex-shrink-0`} style={{ backgroundColor: event.color }}></div>
                                <div className="flex-1">
                                  <p className="font-medium text-lg">{event.title}</p>
                                  <div className="flex items-center text-gray-300 mt-1">
                                    <Clock size={14} className="mr-2 opacity-70" />
                                    <span>
                                      {isToday ? 'Today' : new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, {event.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-300 mt-1">
                                    <MapPin size={14} className="mr-2 opacity-70" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-12 text-center text-white text-xl">
                        <p>No upcoming events</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 notification-footer flex justify-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="w-full text-center text-xl text-cyan-300 hover:text-cyan-200 py-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button className="px-3 py-1.5 bg-sky-600/20 text-sky-400 rounded flex items-center text-sm">
              <Download size={16} className="mr-1" /> Export Report
            </button>
            <button 
              onClick={() => setShowAddEvent(true)}
              className="px-3 py-1.5 bg-sky-600 text-white rounded flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" /> Add New Event
            </button>
          </div>
        </div>

        {/* Calendar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-[#1e2a3e] rounded-lg overflow-hidden shadow-lg">
            {/* Calendar Navigation */}
            <div className="bg-[#1e2a3e] p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button 
                  className="p-1 hover:bg-gray-700 rounded"
                  onClick={handlePreviousPeriod}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="p-1 hover:bg-gray-700 rounded"
                  onClick={handleNextPeriod}
                >
                  <ChevronRight size={18} />
                </button>
                <h2 className="text-lg font-semibold">{currentMonth}</h2>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="px-2 py-1 text-xs bg-[#2a3549] rounded hover:bg-gray-700"
                  onClick={handleTodayClick}
                >
                  Today
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded hover:bg-gray-700 ${activeView === 'month' ? 'view-button-active' : 'bg-[#2a3549]'}`}
                  onClick={() => handleViewChange('month')}
                >
                  Month
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded hover:bg-gray-700 ${activeView === 'week' ? 'view-button-active' : 'bg-[#2a3549]'}`}
                  onClick={() => handleViewChange('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded hover:bg-gray-700 ${activeView === 'day' ? 'view-button-active' : 'bg-[#2a3549]'}`}
                  onClick={() => handleViewChange('day')}
                >
                  Day
                </button>
              </div>
            </div>
            
            {/* Calendar Component - render current view */}
            {renderCurrentView()}
          </div>
          
          {/* Sidebar - Events for selected date */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e2a3e] p-4 rounded-lg shadow-lg">
              <h2 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
                Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} 
                      className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-[#2a3549] transition-colors`}
                      style={{ borderLeftColor: event.color }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-gray-400 text-sm mt-1 space-y-1">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2 opacity-70" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2 opacity-70" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-6">
                  No events selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e2a3e] p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
              {isEditMode ? 'Edit Event' : 'Add New Event'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="DD-MM-YYYY"
                      className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                      value={formData.date.split('-').reverse().join('-')}
                      onChange={(e) => {
                        const parts = e.target.value.split('-');
                        if (parts.length === 3) {
                          const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                          setFormData({...formData, date: formattedDate});
                        }
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                  <div className="relative">
                    <input
                      type="text" 
                      placeholder="HH:MM AM/PM"
                      className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="Department"
                  className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Location (e.g., Room 101)"
                  className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Attendees</label>
                <input
                  type="text"
                  placeholder="Attendees (comma separated)"
                  className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.attendees}
                  onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Type</label>
                <select
                  className="w-full bg-[#1a2234] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as CalendarEvent['type']})}
                >
                  <option value="meeting">Meeting</option>
                  <option value="surgery">Surgery</option>
                  <option value="training">Training</option>
                  <option value="rounds">Rounds</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="shifts">Shifts</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
             onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#1e2a3e] p-6 rounded-lg shadow-xl w-full max-w-md"
               onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2a3549] p-3 rounded">
                  <p className="text-gray-400 text-xs mb-1">Date</p>
                  <p>{new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</p>
                </div>
                <div className="bg-[#2a3549] p-3 rounded">
                  <p className="text-gray-400 text-xs mb-1">Time</p>
                  <p>{selectedEvent.time}</p>
                </div>
              </div>
              
              <div className="bg-[#2a3549] p-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Location</p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" /> 
                  {selectedEvent.location}
                </p>
              </div>
              
              <div className="bg-[#2a3549] p-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Department</p>
                <p>{selectedEvent.department}</p>
              </div>
              
              <div className="bg-[#2a3549] p-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Attendees</p>
                <div className="flex items-start">
                  <Users className="w-4 h-4 mr-1 text-gray-400 mt-0.5" /> 
                  <p>{selectedEvent.attendees.join(', ')}</p>
                </div>
              </div>
              
              <div className="bg-[#2a3549] p-3 rounded">
                <p className="text-gray-400 text-xs mb-1">Event Type</p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs event-${selectedEvent.type}`}>
                  {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleEditEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;