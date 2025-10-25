import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Loader2, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { fetchFAQs } from "../config/sanity";

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

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "General", "Membership", "Events", "Research", "Academic"];

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFAQs();
        
        if (data && data.length > 0) {
          setFaqData(data);
          setFilteredData(data);
        } else {
          setError("No FAQs available at the moment.");
        }
      } catch (error) {
        console.error("Error loading FAQs:", error);
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const filterByCategory = (category) => {
    setActiveFilter(category);
    setOpenFaq(null);
    if (category === "All") {
      setFilteredData(faqData);
    } else {
      setFilteredData(faqData.filter(item => item.category === category));
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
          <p style={{ color: colors.textSecondary }}>Loading FAQs...</p>
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
            <HelpCircle
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Find answers to common questions about our community and activities
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

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.surface }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-opacity-80 transition-all duration-300"
                style={{ backgroundColor: openFaq === index ? colors.surfaceLight : "transparent" }}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                    {item.question}
                  </h3>
                  {item.category && (
                    <span
                      className="text-xs px-2 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor: colors.primary + "20",
                        color: colors.primary,
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
                {openFaq === index ? (
                  <ChevronUp size={24} style={{ color: colors.primary }} />
                ) : (
                  <ChevronDown size={24} style={{ color: colors.textMuted }} />
                )}
              </button>

              {openFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: colors.background }}
                  >
                    <p style={{ color: colors.textSecondary }} className="leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: colors.textSecondary }}>
              No FAQs found in this category.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-8 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6" style={{ color: colors.textSecondary }}>
            Can't find the answer you're looking for? Please reach out to our team.
          </p>
          <button
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors.primary, color: colors.text }}
            onClick={() => window.location.href = "/uitsCIVIL/contact"}
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
