import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Mail, Phone } from "lucide-react";

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

const panelData = {
  "2023-2024": {
    title: "Panel 2023-2024",
    members: [
      {
        name: "Ahmed Rahman",
        position: "President",
        department: "Civil Engineering",
        email: "ahmed.rahman@uits.edu.bd",
        phone: "+880 1712345678",
      },
      {
        name: "Fatima Khan",
        position: "Vice President",
        department: "Civil Engineering",
        email: "fatima.khan@uits.edu.bd",
        phone: "+880 1787654321",
      },
      {
        name: "Mohammad Ali",
        position: "Secretary",
        department: "Civil Engineering",
        email: "mohammad.ali@uits.edu.bd",
        phone: "+880 1798765432",
      },
      {
        name: "Rashida Begum",
        position: "Treasurer",
        department: "Civil Engineering",
        email: "rashida.begum@uits.edu.bd",
        phone: "+880 1756789012",
      },
      {
        name: "Karim Hassan",
        position: "Technical Coordinator",
        department: "Civil Engineering",
        email: "karim.hassan@uits.edu.bd",
        phone: "+880 1723456789",
      },
    ],
  },
  "2024-2025": {
    title: "Panel 2024-2025",
    members: [
      {
        name: "Nadia Islam",
        position: "President",
        department: "Civil Engineering",
        email: "nadia.islam@uits.edu.bd",
        phone: "+880 1734567890",
      },
      {
        name: "Tariq Ahmed",
        position: "Vice President",
        department: "Civil Engineering",
        email: "tariq.ahmed@uits.edu.bd",
        phone: "+880 1745678901",
      },
      {
        name: "Sadia Rahman",
        position: "Secretary",
        department: "Civil Engineering",
        email: "sadia.rahman@uits.edu.bd",
        phone: "+880 1756789012",
      },
      {
        name: "Mahmud Hasan",
        position: "Treasurer",
        department: "Civil Engineering",
        email: "mahmud.hasan@uits.edu.bd",
        phone: "+880 1767890123",
      },
      {
        name: "Amina Khatun",
        position: "Technical Coordinator",
        department: "Civil Engineering",
        email: "amina.khatun@uits.edu.bd",
        phone: "+880 1778901234",
      },
      {
        name: "Rafiq Uddin",
        position: "Event Coordinator",
        department: "Civil Engineering",
        email: "rafiq.uddin@uits.edu.bd",
        phone: "+880 1789012345",
      },
    ],
  },
};

const PanelPage = () => {
  const [activePanel, setActivePanel] = useState("2024-2025");

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
                {/* Image Placeholder */}
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  <Users size={32} style={{ color: colors.textMuted }} />
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
