import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAchievementById, urlFor } from '../config/sanity';

const AchievementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAchievement = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAchievementById(id);
        
        if (data) {
          setAchievement(data);
        } else {
          setError("Achievement not found.");
        }
      } catch (error) {
        console.error("Error loading achievement:", error);
        setError("Failed to load achievement details.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievement();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading achievement details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !achievement) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Achievement Not Found
            </h2>
            <p className="text-gray-400 mb-4">{error || "The achievement you're looking for doesn't exist."}</p>
            <button
              onClick={() => navigate('/uitsCIVIL/achievements')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
            >
              Back to Achievements
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/uitsCIVIL/achievements')}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Achievements
        </button>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          {/* Hero Image */}
          <div className="relative h-96 w-full">
            <img
              src={urlFor(achievement.image).width(1200).height(600).url()}
              alt={achievement.image?.alt || achievement.title}
              className="w-full h-full object-cover"
            />
            {achievement.isInternational && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                <span>🌍</span>
                <span>International Event</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {achievement.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6 text-gray-400">
              {achievement.date && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {achievement.location && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{achievement.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {achievement.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-3">About This Achievement</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {achievement.description}
                </p>
              </div>
            )}

            {/* Gallery */}
            {achievement.gallery && achievement.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {achievement.gallery.map((image, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden">
                      <img
                        src={urlFor(image).width(400).height(300).url()}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
