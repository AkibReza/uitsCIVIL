import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Loader2, X, Filter } from "lucide-react";
import { fetchMediaGallery, urlFor } from "../config/sanity";

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
};

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Facilities", "Events", "Activities", "Projects", "Education", "Community", "Other"];

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMediaGallery();
        
        if (data && data.length > 0) {
          setGalleryData(data);
          setFilteredData(data);
        } else {
          setError("No images available in the gallery.");
        }
      } catch (error) {
        console.error("Error loading gallery:", error);
        setError("Failed to load gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filterByCategory = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter(item => item.category === category));
    }
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
          <p style={{ color: colors.textSecondary }}>Loading gallery...</p>
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
            <ImageIcon
              size={48}
              className="mx-auto mb-4"
              style={{ color: colors.textMuted }}
            />
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              {error}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-20 px-6"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Media Gallery
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Explore our visual journey through events, projects, and community moments
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Filter size={20} style={{ color: colors.accent }} className="my-auto" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "scale-105"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  activeFilter === category ? colors.primary : colors.surface,
                color: activeFilter === category ? colors.text : colors.textSecondary,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.surface }}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative w-full h-64">
                {item.image?.asset?.url ? (
                  <img
                    src={item.image.asset.url}
                    alt={item.image.alt || item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: colors.surfaceLight }}
                  >
                    <ImageIcon size={48} style={{ color: colors.textMuted }} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold mb-1">{item.title}</p>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: colors.textSecondary }}>
              No images found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          ></div>

          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl" style={{ backgroundColor: colors.surface }}>
            <button
              onClick={() => setSelectedImage(null)}
              className="sticky top-4 float-right mr-4 bg-red-500/80 hover:bg-red-600/80 text-white rounded-full p-2 transition-colors duration-200 z-20 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              {selectedImage.image?.asset?.url && (
                <img
                  src={selectedImage.image.asset.url}
                  alt={selectedImage.image.alt || selectedImage.title}
                  className="w-full h-auto rounded-lg mb-6"
                />
              )}

              <h2 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                {selectedImage.title}
              </h2>
              
              <p className="text-lg mb-4" style={{ color: colors.primary }}>
                {selectedImage.category}
              </p>

              {selectedImage.image?.caption && (
                <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                  <em>{selectedImage.image.caption}</em>
                </p>
              )}

              {selectedImage.description && (
                <p style={{ color: colors.textSecondary }}>
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
