import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Mail, Phone, Loader2 } from "lucide-react";
import { fetchPanelData, urlFor } from "../config/sanity";

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

const PanelPage = () => {
  const [activePanel, setActivePanel] = useState("");
  const [panelData, setPanelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPanelData = async () => {
      try {
        setLoading(true);
        setError(null);
        const sanityData = await fetchPanelData();

        if (sanityData && sanityData.length > 0) {
          // Transform Sanity data to match the expected format
          const transformedData = {};
          sanityData.forEach((panel) => {
            transformedData[panel.year] = {
              title: panel.title || `Panel ${panel.year}`,
              members: panel.members
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((member) => ({
                  name: member.name,
                  position: member.position,
                  department: member.department,
                  email: member.email,
                  phone: member.phone,
                  image: member.image,
                  bio: member.bio,
                })),
            };
          });

          setPanelData(transformedData);

          // Set the most recent panel as active
          if (sanityData[0]?.year) {
            setActivePanel(sanityData[0].year);
          }
        } else {
          setError("No panel data available. Please add panel data in Sanity CMS.");
        }
      } catch (error) {
        console.error("Error loading panel data:", error);
        setError("Failed to load panel data. Please check your Sanity CMS configuration.");
      } finally {
        setLoading(false);
      }
    };

    loadPanelData();
  }, []);

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
          <p style={{ color: colors.textSecondary }}>Loading panel data...</p>
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
              Unable to Load Panel Data
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

  // No data state
  if (!panelData || Object.keys(panelData).length === 0) {
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
              No Panel Data Available
            </h2>
            <p
              className="mb-4"
              style={{ color: colors.textSecondary }}
            >
              Please add panel data in Sanity CMS to display the executive panel members.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            UITS ACI Student Chapter
          </h1>
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: colors.primary }}
          >
            Executive Panel
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Meet the dedicated team members who lead our chapter and drive
            innovation in concrete technology and engineering.
          </p>
        </motion.div>

        {/* Panel Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div
            className="flex rounded-lg p-1"
            style={{ backgroundColor: colors.surface }}
          >
            {Object.keys(panelData).map((panel) => (
              <button
                key={panel}
                onClick={() => setActivePanel(panel)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activePanel === panel ? "text-white" : ""
                }`}
                style={{
                  backgroundColor:
                    activePanel === panel ? colors.primary : "transparent",
                  color:
                    activePanel === panel ? colors.text : colors.textSecondary,
                }}
              >
                {panel}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Panel Content */}
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {panelData[activePanel].members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg p-6 hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: colors.surface }}
              >
                {/* Image or Placeholder */}
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  {member.image?.asset?._id ? (
                    <img
                      src={urlFor(member.image).width(200).height(200).url()}
                      alt={member.image?.alt || member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users size={32} style={{ color: colors.textMuted }} />
                  )}
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: colors.text }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-lg font-medium mb-2"
                    style={{ color: colors.primary }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-sm mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {member.department}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm">
                      <Mail
                        size={16}
                        className="mr-2"
                        style={{ color: colors.accent }}
                      />
                      <span style={{ color: colors.textSecondary }}>
                        {member.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center text-sm">
                      <Phone
                        size={16}
                        className="mr-2"
                        style={{ color: colors.accent }}
                      />
                      <span style={{ color: colors.textSecondary }}>
                        {member.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.surface }}
          >
            <Calendar
              size={20}
              className="mr-2"
              style={{ color: colors.accent }}
            />
            <span style={{ color: colors.textSecondary }}>
              Current Active Panel: {activePanel}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PanelPage;
