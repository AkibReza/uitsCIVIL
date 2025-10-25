import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Users, Info, Loader2 } from 'lucide-react';
import { fetchUpcomingEvents, urlFor } from '../config/sanity';

const colors = {
  primary: "#0ea5e9",
  secondary: "#06b6d4", 
  accent: "#8b5cf6",
  background: "#0f172a",
  surface: "#1e293b",
  surfaceLight: "#334155",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#475569",
  gradient: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
  gradientDark: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
};

const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching upcoming events from Sanity...");
        const sanityData = await fetchUpcomingEvents();
        console.log("Fetched Sanity data:", sanityData);

        if (sanityData && sanityData.length > 0) {
          // Transform Sanity data to match the expected format
          const transformedData = sanityData.map((event) => ({
            id: event._id,
            title: event.title,
            date: event.date,
            time: event.time,
            venue: event.venue,
            image: event.image?.asset?.url || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop',
            description: event.description,
            details: event.details,
            organizer: event.organizer || 'ACI UITS Student Chapter',
            capacity: event.capacity || 0,
            registered: event.registered || 0,
          }));

          console.log("Transformed events:", transformedData);
          setEvents(transformedData);
        } else {
          console.log("No events found in Sanity CMS");
          setEvents([]);
        }
      } catch (error) {
        console.error("Error loading events:", error);
        setError("Failed to load events. Please check your Sanity CMS configuration.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <Loader2
            className="animate-spin mx-auto mb-4"
            size={48}
            style={{ color: colors.primary }}
          />
          <p style={{ color: colors.textSecondary }}>Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center max-w-md">
          <div
            className="rounded-lg p-8"
            style={{ backgroundColor: colors.surface }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Unable to Load Events
            </h2>
            <p
              className="mb-4"
              style={{ color: colors.textSecondary }}
            >
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: colors.primary,
                color: colors.text,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No events state
  if (!events || events.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center max-w-md">
          <div
            className="rounded-lg p-8"
            style={{ backgroundColor: colors.surface }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              No Upcoming Events
            </h2>
            <p
              className="mb-4"
              style={{ color: colors.textSecondary }}
            >
              There are no upcoming events scheduled at the moment. Please check back later!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.background,
      color: colors.text,
      padding: '2rem 1rem'
    }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div 
          className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ 
            background: colors.gradient,
            color: colors.text 
          }}
        >
          ACI UITS Student Chapter
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span style={{ color: colors.primary }}>Upcoming</span>{' '}
          <span style={{ color: colors.text }}>Events</span>
        </h1>
        <p style={{ color: colors.textSecondary }} className="text-lg max-w-2xl mx-auto">
          Join us for exciting events in concrete technology, construction innovation, and professional development
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="cursor-pointer group"
              onClick={() => setSelectedEvent(event)}
            >
              <div 
                className="rounded-xl overflow-hidden backdrop-blur-sm border transition-all duration-300 group-hover:shadow-2xl flex flex-col"
                style={{ 
                  background: 'rgba(30, 41, 59, 0.4)',
                  borderColor: colors.border,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  width: '380px',
                  height: '520px',
                  transition: 'all 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(14, 165, 233, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Event Image */}
                <div className="relative overflow-hidden" style={{ height: '280px', backgroundColor: colors.background }}>
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div 
                    className="absolute inset-0 opacity-40"
                    style={{ background: colors.gradientDark }}
                  />
                  {event.capacity > 0 && (
                    <div className="absolute top-4 right-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: colors.text 
                        }}
                      >
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-5 flex flex-col justify-between" style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2" style={{ color: colors.text }}>
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }} className="text-xs">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: colors.secondary }} />
                        <span style={{ color: colors.textSecondary }} className="text-xs">
                          {event.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={16} style={{ color: colors.accent }} />
                        <span style={{ color: colors.textSecondary }} className="text-xs line-clamp-1">
                          {event.venue}
                        </span>
                      </div>
                    </div>
                    
                    <p style={{ color: colors.textMuted }} className="text-xs line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                    <button 
                      className="text-xs font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                      style={{ color: colors.primary }}
                    >
                      Learn More
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl"
              style={{ 
                background: colors.surface,
                border: `1px solid ${colors.border}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative" style={{ backgroundColor: colors.background }}>
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full"
                  style={{ 
                    maxHeight: '450px', 
                    minHeight: '300px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{ background: colors.gradientDark }}
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm hover:opacity-80 transition-opacity z-10"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                >
                  <X size={20} style={{ color: colors.text }} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)' }}>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} style={{ color: colors.primary }} />
                    <div>
                      <p style={{ color: colors.textSecondary }} className="text-sm">Date</p>
                      <p style={{ color: colors.text }} className="font-semibold">
                        {formatDate(selectedEvent.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={20} style={{ color: colors.secondary }} />
                    <div>
                      <p style={{ color: colors.textSecondary }} className="text-sm">Time</p>
                      <p style={{ color: colors.text }} className="font-semibold">
                        {selectedEvent.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin size={20} style={{ color: colors.accent }} />
                    <div>
                      <p style={{ color: colors.textSecondary }} className="text-sm">Venue</p>
                      <p style={{ color: colors.text }} className="font-semibold">
                        {selectedEvent.venue}
                      </p>
                    </div>
                  </div>
                  
                  {selectedEvent.capacity > 0 && (
                    <div className="flex items-center gap-3">
                      <Users size={20} style={{ color: colors.primary }} />
                      <div>
                        <p style={{ color: colors.textSecondary }} className="text-sm">Capacity</p>
                        <p style={{ color: colors.text }} className="font-semibold">
                          {selectedEvent.registered}/{selectedEvent.capacity} registered
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: colors.text }}>
                    <Info size={20} style={{ color: colors.secondary }} />
                    Event Details
                  </h3>
                  <p style={{ color: colors.textSecondary }} className="leading-relaxed">
                    {selectedEvent.details}
                  </p>
                </div>

                <div className="mb-6">
                  <p style={{ color: colors.textMuted }} className="text-sm">
                    Organized by: <span style={{ color: colors.primary }}>{selectedEvent.organizer}</span>
                  </p>
                </div>

                {/* <div className="flex gap-4">
                  <button 
                    className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-300 hover:opacity-90"
                    style={{ 
                      background: colors.gradient,
                      color: colors.text 
                    }}
                  >
                    Register Now
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold border transition-colors duration-300 hover:opacity-80"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.textSecondary 
                    }}
                  >
                    Share
                  </button>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpcomingEvents;