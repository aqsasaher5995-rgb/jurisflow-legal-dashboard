import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight, FaFileAlt,
  FaUsers, FaGavel, FaCircle, FaPlusCircle,
  FaTimes
} from 'react-icons/fa';

const CalendarView = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      hearing: 'border-emerald-400 bg-emerald-400/10',
      meeting: 'border-blue-400 bg-blue-400/10',
      deposition: 'border-amber-400 bg-amber-400/10',
      conference: 'border-purple-400 bg-purple-400/10',
    };
    return colors[type] || 'border-gray-400 bg-gray-400/10';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      hearing: <FaGavel className="text-xs" />,
      meeting: <FaUsers className="text-xs" />,
      deposition: <FaFileAlt className="text-xs" />,
      conference: <FaCalendarAlt className="text-xs" />,
    };
    return icons[type] || <FaCircle className="text-xs" />;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-[rgba(255,255,255,0.05)] rounded-lg"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div 
          key={day} 
          className={`min-h-24 border border-[rgba(255,255,255,0.05)] rounded-lg p-2 hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer ${
            isToday ? 'border-blue-500' : ''
          }`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-gray-400'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedEvent(event)}
                className={`text-[10px] p-1 rounded border-l-2 ${getEventTypeColor(event.type)} text-gray-300 truncate hover:text-white transition-colors cursor-pointer`}
              >
                <span className="flex items-center gap-1">
                  {getEventTypeIcon(event.type)}
                  {event.title}
                </span>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-[10px] text-gray-500 text-center">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar</h2>
          <p className="text-sm text-gray-400 mt-1">Schedule and events overview</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
          <FaPlusCircle className="text-sm" />
          Add Event
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all duration-200"
        >
          <FaChevronLeft />
        </button>
        <h3 className="text-lg font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all duration-200"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">Case #{selectedEvent.caseId}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-gray-500">at</span>
                  <FaClock className="text-blue-400 ml-2" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-300">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                <button className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors font-medium">
                  Edit Event
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;