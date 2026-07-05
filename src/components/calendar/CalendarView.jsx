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
      hearing: 'border-[#3282B8] bg-[#3282B8]/10 text-[#1B262C]',
      meeting: 'border-[#0F4C75] bg-[#0F4C75]/10 text-[#1B262C]',
      deposition: 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#1B262C]',
      conference: 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#1B262C]',
    };
    return colors[type] || 'border-[#BBE1FA] bg-[#F0F4F8] text-[#6B7280]';
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
      days.push(<div key={`empty-${i}`} className="h-24 border border-[#BBE1FA] rounded-xl bg-[#F0F4F8]/30"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div 
          key={day} 
          className={`min-h-24 border rounded-xl p-2 transition-all duration-300 cursor-pointer ${
            isToday ? 'border-[#3282B8] bg-[#3282B8]/10 shadow-lg shadow-[#0F4C75]/20' : 'border-[#BBE1FA] bg-white hover:bg-[#3282B8]/5 hover:border-[#3282B8]'
          }`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-[#3282B8]' : 'text-[#1B262C]'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedEvent(event)}
                className={`text-[10px] p-1 rounded border-l-2 ${getEventTypeColor(event.type)} truncate hover:opacity-80 transition-colors cursor-pointer shadow-sm`}
              >
                <span className="flex items-center gap-1">
                  {getEventTypeIcon(event.type)}
                  {event.title}
                </span>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-[10px] text-[#9CA3AF] text-center">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  // Add Event Modal - DEEP CURRENT THEME
  const AddEventModal = () => {
    if (!showAddEventModal) return null;

    return (
      <div className="fixed inset-0 bg-[#1B262C]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddEventModal(false)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-premium-lg p-6 relative border border-[#3282B8]" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowAddEventModal(false)}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#F0F4F8] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1B262C]">Add New Event</h3>
                <p className="text-xs text-[#6B7280]">Schedule a new event</p>
              </div>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  rows="3"
                  placeholder="Enter event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Case ID (Optional)</label>
                <input
                  type="text"
                  value={formData.caseId}
                  onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter case ID"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#BBE1FA]">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 btn-primary font-medium"
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

  // Edit Event Modal - DEEP CURRENT THEME
  const EditEventModal = () => {
    if (!showEditEventModal || !selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-[#1B262C]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEditEventModal(false)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-premium-lg p-6 relative border border-[#3282B8]" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowEditEventModal(false)}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#F0F4F8] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                <FaEdit className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1B262C]">Edit Event</h3>
                <p className="text-xs text-[#6B7280]">Update event details</p>
              </div>
            </div>

            <form onSubmit={handleEditEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || selectedEvent.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date || selectedEvent.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time || selectedEvent.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Event Type</label>
                <select
                  value={formData.type || selectedEvent.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || selectedEvent.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Description</label>
                <textarea
                  value={formData.description || selectedEvent.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#BBE1FA]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 btn-primary font-medium"
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

  // Event Details Modal - DEEP CURRENT THEME
  const EventDetailsModal = () => {
    if (!selectedEvent || showEditEventModal) return null;

    const eventType = eventTypes.find(t => t.value === selectedEvent.type);

    return (
      <div className="fixed inset-0 bg-[#1B262C]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-premium-lg p-6 relative border border-[#3282B8]" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#F0F4F8] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1B262C]">{selectedEvent.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  {selectedEvent.caseId && (
                    <span className="text-xs text-[#6B7280]">Case #{selectedEvent.caseId}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getEventTypeColor(selectedEvent.type)}`}>
                    {getEventTypeLabel(selectedEvent.type)}
                  </span>
                </div>
              </div>
              {eventType && (
                <div className="p-2 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                  {React.createElement(eventType.icon, { className: 'text-white text-xl' })}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#1B262C]">
                <FaCalendarAlt className="text-[#0F4C75]" />
                <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-[#9CA3AF]">at</span>
                <FaClock className="text-[#0F4C75] ml-2" />
                <span>{selectedEvent.time}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-3 text-sm text-[#1B262C]">
                  <FaMapMarkerAlt className="text-[#0F4C75]" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="p-3 bg-[#3282B8]/5 rounded-lg border border-[#3282B8]/30">
                  <p className="text-xs text-[#6B7280] mb-1">Description</p>
                  <p className="text-sm text-[#1B262C]">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#BBE1FA]">
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
                className="flex-1 px-4 py-2 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 transition-colors font-medium"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                onClick={handleDeleteEvent}
                className="flex-1 px-4 py-2 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 rounded-lg hover:bg-[#EF4444]/20 transition-colors font-medium"
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 px-4 py-2 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
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
    <div className="bg-white rounded-2xl border border-[#BBE1FA] shadow-premium p-6 hover:shadow-premium-lg transition-shadow">
      {/* Calendar Header - DEEP CURRENT THEME */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B262C]">Calendar</h2>
          <p className="text-sm text-[#6B7280] mt-1">Schedule and events overview</p>
        </div>
        <button 
          onClick={() => setShowAddEventModal(true)}
          className="flex items-center gap-2 btn-primary px-4 py-2 font-medium"
        >
          <FaPlusCircle className="text-sm" />
          Add Event
        </button>
      </div>

      {/* Month Navigation - DEEP CURRENT THEME */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 text-[#9CA3AF] hover:text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
        >
          <FaChevronLeft />
        </button>
        <h3 className="text-lg font-semibold text-[#1B262C]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 text-[#9CA3AF] hover:text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Day Names - DEEP CURRENT THEME */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-[#6B7280] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid - DEEP CURRENT THEME */}
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