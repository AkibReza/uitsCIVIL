import { useState, useEffect } from "react";
import { X, ZoomIn, Award } from "lucide-react";
import { fetchAchievements, urlFor } from "../config/sanity";

const Achievements = () => {
  const [filter, setFilter] = useState("all");
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAchievements();
        
        if (data && data.length > 0) {
          setAchievements(data);
        } else {
          setError("No achievements available. Please add achievements in Sanity CMS.");
        }
      } catch (error) {
        console.error("Error loading achievements:", error);
        setError("Failed to load achievements. Please check your Sanity CMS configuration.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  const filtered =
    filter === "all"
      ? achievements
      : achievements.filter((a) => a.isInternational);

  const openModal = (achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading achievements...</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Unable to Load Achievements
            </h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!achievements || achievements.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              No Achievements Available
            </h2>
            <p className="text-gray-400">
              Please add achievements in Sanity CMS to display them here.
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
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hall of Distinction
          </h1>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              The ACI UITS Student Chapter has earned national recognition within
              months of its formation. Officially approved on March 14, 2024, by
              ACI and ACI Bangladesh Chapter, the chapter quickly rose to
              prominence. On May 13, 2024, it proudly received the official ACI
              banner. Soon after, it was honored with the 2024 Outstanding Student
              Chapter Award - a significant achievement acknowledging academic
              excellence, leadership, and outreach. These distinctions reflect the
              chapter's rapid growth, commitment, and impact in civil engineering
              education.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 gap-4">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
            }`}
            onClick={() => setFilter("all")}
          >
            All Achievements
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              filter === "international"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
            }`}
            onClick={() => setFilter("international")}
          >
            International Achievements
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((achievement, index) => (
            <div
              key={achievement._id}
              className="group relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-purple-500/30 hover:scale-[1.05] animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(achievement)}
            >
              {/* Achievement Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={urlFor(achievement.image).width(600).height(400).url()}
                  alt={achievement.image?.alt || achievement.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <div class="text-center">
                          <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </svg>
                          </div>
                          <p class="text-white text-sm">Achievement Image</p>
                        </div>
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* International Badge */}
                {achievement.isInternational && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    International
                  </div>
                )}
                
                {/* Date Badge */}
                {achievement.date && (
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                    <p className="text-blue-300 text-xs font-semibold">{achievement.date}</p>
                  </div>
                )}
              </div>

              {/* Achievement Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {achievement.description}
                  </p>
                )}
                
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
            More achievements and milestones coming soon. Stay tuned for updates!
          </p>
        </div>
      </div>

      {/* Achievement Details Modal with Blur Background */}
      {isModalOpen && selectedAchievement && (
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
                  {selectedAchievement.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                {selectedAchievement.date && (
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-blue-300 font-medium text-sm">
                    {selectedAchievement.date}
                  </div>
                )}
                {selectedAchievement.isInternational && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 text-yellow-300 font-medium text-sm flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    International Achievement
                  </div>
                )}
                {selectedAchievement.category && (
                  <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-full px-4 py-2 text-green-300 font-medium text-sm">
                    {selectedAchievement.category}
                  </div>
                )}
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-6"></div>
            </div>

            {/* Modal Body */}
            <div className="pb-8">
              {/* Achievement Image - Full View at Top */}
              {selectedAchievement.image && (
                <div className="mb-8">
                  <div className="relative overflow-hidden bg-gray-900">
                    <img
                      src={urlFor(selectedAchievement.image).width(1200).url()}
                      alt={selectedAchievement.image?.alt || selectedAchievement.title}
                      className="w-full h-auto object-contain max-h-[500px]"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-600">
                            <div class="text-center">
                              <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                              </div>
                              <p class="text-gray-400 text-xs">Image not found</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedAchievement.description && (
                <div className="px-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                    About This Achievement
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {selectedAchievement.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              {(selectedAchievement.awardedBy || selectedAchievement.location) && (
                <div className="px-8 mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                    Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAchievement.awardedBy && (
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Awarded By</p>
                        <p className="text-white font-medium">{selectedAchievement.awardedBy}</p>
                      </div>
                    )}
                    {selectedAchievement.location && (
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Location</p>
                        <p className="text-white font-medium">{selectedAchievement.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

export default Achievements;
