import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight, FaFileAlt,
  FaUsers, FaGavel, FaCircle, FaPlusCircle,
  FaTimes, FaEdit, FaTrash, FaSave
} from 'react-icons/fa';

const CalendarView = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'hearing',
    location: '',
    description: '',
    caseId: '',
  });

  const eventTypes = [
    { value: 'hearing', label: 'Hearing', icon: FaGavel, color: 'emerald' },
    { value: 'meeting', label: 'Meeting', icon: FaUsers, color: 'blue' },
    { value: 'deposition', label: 'Deposition', icon: FaFileAlt, color: 'amber' },
    { value: 'conference', label: 'Conference', icon: FaCalendarAlt, color: 'purple' },
  ];

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
      hearing: 'border-emerald-400 bg-emerald-400/10 text-emerald-400',
      meeting: 'border-blue-400 bg-blue-400/10 text-blue-400',
      deposition: 'border-amber-400 bg-amber-400/10 text-amber-400',
      conference: 'border-purple-400 bg-purple-400/10 text-purple-400',
    };
    return colors[type] || 'border-gray-400 bg-gray-400/10 text-gray-400';
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

  const getEventTypeLabel = (type) => {
    const types = {
      hearing: 'Hearing',
      meeting: 'Meeting',
      deposition: 'Deposition',
      conference: 'Conference',
    };
    return types[type] || type;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (onAddEvent) {
      onAddEvent({
        ...formData,
        id: `event_${Date.now()}`,
      });
    }
    setShowAddEventModal(false);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      type: 'hearing',
      location: '',
      description: '',
      caseId: '',
    });
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    if (onEditEvent && selectedEvent) {
      onEditEvent({
        ...selectedEvent,
        ...formData,
      });
    }
    setShowEditEventModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && onDeleteEvent) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        onDeleteEvent(selectedEvent.id);
        setSelectedEvent(null);
      }
    }
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

  // Add Event Modal
  const AddEventModal = () => {
    if (!showAddEventModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowAddEventModal(false)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowAddEventModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <FaCalendarAlt className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Add New Event</h3>
                <p className="text-xs text-gray-400">Schedule a new event</p>
              </div>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  rows="3"
                  placeholder="Enter event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Case ID (Optional)</label>
                <input
                  type="text"
                  value={formData.caseId}
                  onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter case ID"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <FaSave className="inline mr-2" /> Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Edit Event Modal
  const EditEventModal = () => {
    if (!showEditEventModal || !selectedEvent) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowEditEventModal(false)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowEditEventModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <FaEdit className="text-yellow-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Edit Event</h3>
                <p className="text-xs text-gray-400">Update event details</p>
              </div>
            </div>

            <form onSubmit={handleEditEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || selectedEvent.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date || selectedEvent.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time || selectedEvent.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
                <select
                  value={formData.type || selectedEvent.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || selectedEvent.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={formData.description || selectedEvent.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                >
                  <FaSave className="inline mr-2" /> Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Event Details Modal
  const EventDetailsModal = () => {
    if (!selectedEvent || showEditEventModal) return null;

    const eventType = eventTypes.find(t => t.value === selectedEvent.type);

    return (
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
                  {selectedEvent.caseId && (
                    <span className="text-xs text-gray-400">Case #{selectedEvent.caseId}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getEventTypeColor(selectedEvent.type)}`}>
                    {getEventTypeLabel(selectedEvent.type)}
                  </span>
                </div>
              </div>
              {eventType && (
                <div className="p-2 bg-[rgba(255,255,255,0.05)] rounded-xl">
                  {React.createElement(eventType.icon, { className: `text-${eventType.color}-400 text-xl` })}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaCalendarAlt className="text-blue-400" />
                <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-gray-500">at</span>
                <FaClock className="text-blue-400 ml-2" />
                <span>{selectedEvent.time}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-300">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <button
                onClick={() => {
                  setFormData({
                    title: selectedEvent.title,
                    date: selectedEvent.date,
                    time: selectedEvent.time,
                    type: selectedEvent.type,
                    location: selectedEvent.location || '',
                    description: selectedEvent.description || '',
                    caseId: selectedEvent.caseId || '',
                  });
                  setShowEditEventModal(true);
                }}
                className="flex-1 px-4 py-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors font-medium"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                onClick={handleDeleteEvent}
                className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
              >
                <FaTrash className="inline mr-2" /> Delete
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
    );
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar</h2>
          <p className="text-sm text-gray-400 mt-1">Schedule and events overview</p>
        </div>
        <button 
          onClick={() => setShowAddEventModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
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

      {/* Modals */}
      <AddEventModal />
      <EditEventModal />
      <EventDetailsModal />
    </div>
  );
};

export default CalendarView;