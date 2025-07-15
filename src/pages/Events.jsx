import { useState } from "react";

const Events = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image, eventTitle) => {
    setSelectedImage({ src: image, title: eventTitle });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  const eventsData = [
    {
      id: 1,
      title: "First General Meeting",
      date: "18 March, 2024",
      description: "The first general meeting of ACI UITS Student Chapter was held on 18 March, 2024. This meeting was a discussion session for planning for future participation & activities.",
      images: ["/Assets/img/events/Picture2.png", "/Assets/img/events/Picture3.png"]
    },
    {
      id: 2,
      title: "ACI UITS Student Chapter Review Meeting",
      date: "8 May, 2024",
      description: "ACI UITS Student Chapter successfully conducted a review meeting to discuss their chapter activities. The primary focus of the meeting was to expand concrete knowledge and technology, organize seminars by key resource persons, develop research skills, and build collaborations.",
      images: ["/Assets/img/events/Picture2.png", "/Assets/img/events/Picture3.png"]
    },
    {
      id: 3,
      title: "Executive Committee Announcement Session",
      date: "22 May, 2024",
      description: "Official announcement of the executive committee members and their roles for the upcoming term.",
      images: ["/Assets/img/events/Picture4.png"]
    },
    {
      id: 4,
      title: "Meet up with Freshers",
      date: "21 April, 2024",
      description: "Successful meetup session was held with the students of Level-1, Semester-2 from the Department of Civil Engineering, UITS, organized by the ACI UITS Student Chapter. The session focused on discussing the General Member Recruitment Process, along with the vision and upcoming activities of ACI.",
      images: ["/Assets/img/events/Picture5.png", "/Assets/img/events/Picture6.png"]
    },
    {
      id: 5,
      title: "Networking Session",
      date: "Various Dates",
      description: "Regular networking sessions to build connections among members and foster collaboration within the chapter.",
      images: ["/Assets/img/events/Picture7.png", "/Assets/img/events/Picture8.png"]
    }
  ];

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
              A detailed chronicle of the impactful events organized and hosted by
              our chapter - including seminars, knowledge sessions, chapter
              launches, and special observances. This archive reflects our
              commitment to fostering continuous learning and innovation.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Events Timeline */}
        <div className="space-y-16">
          {eventsData.map((event, index) => (
            <div
              key={event.id}
              className={`relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-purple-500/20 hover:scale-[1.02] animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
                            
              {/* Content Container */}
              <div className="p-8 md:p-12">
                {/* Event Header */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0 pr-4">
                      {event.title}
                    </h2>
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-blue-300 font-medium text-sm whitespace-nowrap">
                      {event.date}
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Images Grid */}
                <div className={`grid gap-6 ${
                  event.images.length === 1 
                    ? 'grid-cols-1 max-w-2xl mx-auto' 
                    : 'grid-cols-1 md:grid-cols-2'
                }`}>
                  {event.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="group relative overflow-hidden rounded-xl bg-gray-700 hover:shadow-2xl transition-all duration-300 hover:shadow-purple-500/30 cursor-pointer"
                      onClick={() => openModal(image, event.title)}
                    >
                      <img
                        src={image}
                        alt={`${event.title} - Image ${imgIndex + 1}`}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-600">
                              <div class="text-center">
                                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p class="text-white font-medium text-lg mb-2">${event.title}</p>
                                <p class="text-gray-300 text-sm">Event Photo ${imgIndex + 1}</p>
                                <p class="text-gray-400 text-xs mt-2">Image not found</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Click to view larger</p>
                      </div>
                      {/* Zoom icon */}
                      <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>
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

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal content */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <div class="text-center">
                        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p class="text-white font-medium text-xl">${selectedImage.title}</p>
                        <p class="text-gray-300 text-sm mt-2">Image could not be loaded</p>
                      </div>
                    </div>
                  `;
                }}
              />
              <div className="p-6 border-t border-gray-700">
                <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                <p className="text-gray-400 text-sm mt-1">Click outside or press the X to close</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
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