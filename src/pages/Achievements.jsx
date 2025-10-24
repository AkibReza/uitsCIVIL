import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAchievements, urlFor } from "../config/sanity";

const Achievements = () => {
  const [filter, setFilter] = useState("all");
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-white mb-6 text-center ">
          Hall of Distinction
        </h1>
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-5 py-2 rounded font-semibold transition ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All Events
          </button>
          <button
            className={`px-5 py-2 rounded font-semibold transition ${
              filter === "international"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={() => setFilter("international")}
          >
            International Events
          </button>
        </div>
        <div>
          <p className="text-gray-400 text-center mb-6">
            The ACI UITS Student Chapter has earned national recognition within
            months of its formation. Officially approved on March 14, 2024, by
            ACI and ACI Bangladesh Chapter, the chapter quickly rose to
            prominence. On May 13, 2024, it proudly received the official ACI
            banner. Soon after, it was honored with the 2024 Outstanding Student
            Chapter Award - a significant achievement acknowledging academic
            excellence, leadership, and outreach. These distinctions reflect the
            chapter’s rapid growth, commitment, and impact in civil engineering
            education.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((a) => (
            <div
              key={a._id}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg group transition-transform duration-200 hover:-translate-y-1 bg-gray-800"
              onClick={() => navigate(`/uitsCIVIL/achievement/${a._id}`)}
            >
              <img
                src={urlFor(a.image).width(600).height(400).url()}
                alt={a.image?.alt || a.title}
                className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold text-center px-4">
                  {a.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
