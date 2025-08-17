import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Users, Info } from 'lucide-react';

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

  const events = [
    {
      id: 1,
      title: "Advanced Concrete Mix Design Workshop",
      date: "2025-08-25",
      time: "10:00 AM - 4:00 PM",
      venue: "UITS Engineering Lab",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
      description: "Join us for an intensive workshop on advanced concrete mix design techniques. Learn about sustainable materials, high-performance concrete, and optimization strategies used in modern construction projects.",
      details: "This comprehensive workshop will cover the latest developments in concrete mix design, including the use of supplementary cementitious materials, chemical admixtures, and fiber reinforcement. Participants will engage in hands-on activities and real-world case studies.",
      organizer: "ACI UITS Student Chapter",
      capacity: 50,
      registered: 32
    },
    {
      id: 2,
      title: "Structural Health Monitoring Seminar",
      date: "2025-08-30",
      time: "2:00 PM - 5:00 PM", 
      venue: "UITS Auditorium",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
      description: "Explore cutting-edge technologies in structural health monitoring for concrete structures. Learn about sensors, data analysis, and predictive maintenance strategies.",
      details: "Industry experts will present on IoT sensors, machine learning applications in structural monitoring, and case studies from major infrastructure projects. The seminar includes networking opportunities with professionals.",
      organizer: "ACI UITS Student Chapter",
      capacity: 150,
      registered: 89
    },
    {
      id: 3,
      title: "Concrete Testing Laboratory Session",
      date: "2025-09-05",
      time: "9:00 AM - 12:00 PM",
      venue: "Materials Testing Lab",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
      description: "Hands-on laboratory session covering standard concrete testing procedures including compressive strength, slump test, and durability assessments.",
      details: "Students will perform various concrete tests following ASTM and ACI standards. Each participant will prepare test specimens and analyze results using professional equipment under expert supervision.",
      organizer: "ACI UITS Student Chapter",
      capacity: 30,
      registered: 24
    },
    {
      id: 4,
      title: "Sustainable Construction Materials Conference",
      date: "2025-09-12",
      time: "9:00 AM - 6:00 PM",
      venue: "UITS Convention Center",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
      description: "Annual conference focusing on sustainable and eco-friendly concrete materials, green building practices, and carbon footprint reduction in construction.",
      details: "Leading researchers and industry professionals will present the latest innovations in sustainable concrete, including recycled aggregates, bio-based admixtures, and carbon capture technologies in cement production.",
      organizer: "ACI UITS Student Chapter",
      capacity: 200,
      registered: 156
    },
    {
      id: 5,
      title: "3D Concrete Printing Demonstration",
      date: "2025-09-18",
      time: "1:00 PM - 4:00 PM",
      venue: "Innovation Lab",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      description: "Live demonstration of 3D concrete printing technology with hands-on experience in digital construction methods and parametric design.",
      details: "Witness the future of construction with live 3D concrete printing demonstrations. Learn about digital design workflows, material requirements, and applications in modern architecture and construction.",
      organizer: "ACI UITS Student Chapter",
      capacity: 40,
      registered: 18
    },
    {
      id: 6,
      title: "Industry Site Visit - Metro Construction",
      date: "2025-09-25",
      time: "8:00 AM - 5:00 PM",
      venue: "Metro Rail Construction Site",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop",
      description: "Educational site visit to major metro construction project to observe large-scale concrete operations and construction management practices.",
      details: "Exclusive access to ongoing metro rail construction site with guided tours by project engineers. Observe high-volume concrete pours, quality control procedures, and safety protocols in action.",
      organizer: "ACI UITS Student Chapter",
      capacity: 25,
      registered: 25
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
                  width: '500px',
                  height: '500px',
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
                <div className="relative flex-1 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 opacity-60"
                    style={{ background: colors.gradientDark }}
                  />
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.text 
                      }}
                    >
                      {event.registered}/{event.capacity}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2" style={{ color: colors.text }}>
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }} className="text-sm">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock size={18} style={{ color: colors.secondary }} />
                        <span style={{ color: colors.textSecondary }} className="text-sm">
                          {event.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin size={18} style={{ color: colors.accent }} />
                        <span style={{ color: colors.textSecondary }} className="text-sm">
                          {event.venue}
                        </span>
                      </div>
                    </div>
                    
                    <p style={{ color: colors.textMuted }} className="text-sm line-clamp-4 mb-4">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${colors.border}` }}>
                    <button 
                      className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
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
              <div className="relative">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{ background: colors.gradientDark }}
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <X size={20} style={{ color: colors.text }} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
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
                  
                  <div className="flex items-center gap-3">
                    {/* <Users size={20} style={{ color: colors.primary }} />
                    <div>
                      <p style={{ color: colors.textSecondary }} className="text-sm">Capacity</p>
                      <p style={{ color: colors.text }} className="font-semibold">
                        {selectedEvent.registered}/{selectedEvent.capacity} registered
                      </p>
                    </div> */}
                  </div>
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