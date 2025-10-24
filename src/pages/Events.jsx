import { useState, useEffect } from "react";
import { X, ZoomIn, Image, Loader2 } from "lucide-react";
import { fetchEvents, urlFor } from "../config/sanity";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const sanityData = await fetchEvents();

        if (sanityData && sanityData.length > 0) {
          // Transform Sanity data to match the expected format
          const transformedEvents = sanityData.map((event) => ({
            id: event._id,
            title: event.title,
            date: event.date,
            description: event.description,
            images: event.images?.map((img) => img.asset?.url || "") || [],
            imageAlts: event.images?.map((img) => img.alt || event.title) || [],
            featured: event.featured || false,
          }));

          setEventsData(transformedEvents);
        } else {
          setError("No events available. Please add events in Sanity CMS.");
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

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-400" size={48} />
          <p className="text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Unable to Load Events
            </h2>
            <p className="mb-4 text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!eventsData || eventsData.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              No Events Available
            </h2>
            <p className="mb-4 text-gray-300">
              Please add events in Sanity CMS to display them here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 py-8 px-0">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Legacy of Engagement Events
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              A detailed chronicle of the impactful events organized and hosted
              by our chapter - including seminars, knowledge sessions, chapter
              launches, and special observances. This archive reflects our
              commitment to fostering continuous learning and innovation.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event, index) => (
            <div
              key={event.id}
              className="group relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-purple-500/30 hover:scale-[1.05] animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(event)}
            >
              {/* Event Image */}
              <div className="relative overflow-hidden h-56">
                {event.images && event.images.length > 0 ? (
                  <img
                    src={event.images[0]}
                    alt={event.imageAlts?.[0] || event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "";
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <div class="text-center">
                            <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <p class="text-white text-sm">Event Image</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white text-sm">Event Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                )}
                
                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                  <p className="text-blue-300 text-xs font-semibold">{event.date}</p>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {event.description}
                </p>
                
                {/* View Details Button */}
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                    Click to view details
                  </span>
                  <div className="bg-blue-500/20 rounded-full p-2 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <ZoomIn className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-400 text-sm">
            More events and activities coming soon. Stay tuned for updates!
          </p>
        </div>
      </div>

      {/* Event Details Modal with Blur Background */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred Background Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in z-10">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="sticky top-4 float-right mr-4 bg-red-500/80 hover:bg-red-600/80 text-white rounded-full p-2 transition-colors duration-200 z-20 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="p-8 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-0 pr-12">
                  {selectedEvent.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-blue-300 font-medium text-sm">
                  {selectedEvent.date}
                </div>
                {selectedEvent.featured && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 text-yellow-300 font-medium text-sm">
                    Featured Event
                  </div>
                )}
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-6"></div>
            </div>

            {/* Modal Body */}
            <div className="pb-8">
              {/* Images Gallery - Full View at Top */}
              {selectedEvent.images && selectedEvent.images.length > 0 && (
                <div className="mb-8">
                  <div
                    className={`grid gap-2 ${
                      selectedEvent.images.length === 1
                        ? "grid-cols-1"
                        : selectedEvent.images.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    {selectedEvent.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative overflow-hidden bg-gray-900"
                      >
                        <img
                          src={image}
                          alt={selectedEvent.imageAlts?.[imgIndex] || `${selectedEvent.title} - Image ${imgIndex + 1}`}
                          className="w-full h-auto object-contain max-h-[500px]"
                          onError={(e) => {
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-600">
                                <div class="text-center">
                                  <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                  <p class="text-gray-400 text-xs">Image not found</p>
                                </div>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="px-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  About This Event
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Events;
