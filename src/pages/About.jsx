import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Target, Award, Building2, BookOpen, Lightbulb, Trophy } from 'lucide-react';

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

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { icon: Users, label: "Active Members", value: "45+", color: colors.primary },
    { icon: Calendar, label: "Yearly Events", value: "12+", color: colors.secondary },
    { icon: BookOpen, label: "Research Projects", value: "8", color: colors.accent },
    { icon: Trophy, label: "Recognitions", value: "6", color: colors.primary }
  ];

  const achievements = [
    {
      title: "Excellence in Concrete Innovation",
      description: "Recognized for outstanding student research in sustainable concrete materials",
      year: "2024"
    },
    {
      title: "Best Student Chapter Award",
      description: "ACI Regional recognition for exceptional chapter activities and growth",
      year: "2024"
    },
    {
      title: "Research Publication",
      description: "Published 3 papers in international concrete technology journals",
      year: "2023-2024"
    },
    {
      title: "Industry Partnership",
      description: "Established collaborations with 5+ leading construction companies",
      year: "2023"
    }
  ];

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh' }}>
      {/* Header Section with Background Image */}
      <motion.div 
        className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./assets/img/home/about_us.jpg')"
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7))'
          }}
        ></div>
        
        {/* Content */}
        <motion.div 
          className="relative z-10 text-center px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              background: colors.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light"
            style={{ color: colors.text, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            UITS ACI Student Chapter
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Brief About Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-16"
        >
          <div 
            className="rounded-2xl p-8 md:p-12"
            style={{ 
              background: colors.gradientDark,
              border: `1px solid ${colors.border}`
            }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 flex items-center gap-3"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Lightbulb style={{ color: colors.accent }} />
              A Short Brief About UITS ACI
            </motion.h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: colors.textSecondary }}>
              The UITS ACI Student Chapter serves as a dynamic bridge between academic excellence and professional innovation in concrete technology. As part of the prestigious Civil Engineering Department at the University of Information Technology & Sciences, we are dedicated to advancing the field of concrete engineering through cutting-edge research, hands-on learning experiences, and industry collaboration.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Our chapter empowers students to explore the fascinating world of concrete materials, sustainable construction practices, and innovative design solutions while building lasting connections with industry professionals and fellow engineers.
            </p>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical Timeline Line */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full"
              style={{ background: colors.gradient }}
            ></div>
            
            {/* Timeline Items */}
            <div className="relative space-y-12 py-8">
              
              {/* 2023 */}
              <motion.div 
                className="flex items-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1/2 pr-8 text-right">
                  <motion.div
                    className="p-4 rounded-xl cursor-pointer"
                    style={{ 
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`
                    }}
                    whileHover={{ 
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.primary,
                      boxShadow: `0 8px 25px rgba(14, 165, 233, 0.3)`
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>2023</h3>
                    <p style={{ color: colors.textSecondary }}>ACI Student Chapter Founded</p>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                      Official establishment at UITS Civil Department
                    </p>
                  </motion.div>
                </div>
                
                {/* Center Circle */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10"
                  style={{ 
                    backgroundColor: colors.primary,
                    borderColor: colors.background
                  }}
                  whileHover={{ 
                    scale: 1.5,
                    boxShadow: `0 0 20px ${colors.primary}`
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2024 */}
              <motion.div 
                className="flex items-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1/2 pr-8"></div>
                
                {/* Center Circle */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10"
                  style={{ 
                    backgroundColor: colors.secondary,
                    borderColor: colors.background
                  }}
                  whileHover={{ 
                    scale: 1.5,
                    boxShadow: `0 0 20px ${colors.secondary}`
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <div className="w-1/2 pl-8">
                  <motion.div
                    className="p-4 rounded-xl cursor-pointer"
                    style={{ 
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`
                    }}
                    whileHover={{ 
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.secondary,
                      boxShadow: `0 8px 25px rgba(6, 182, 212, 0.3)`
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.secondary }}>2024</h3>
                    <p style={{ color: colors.textSecondary }}>Growth & Recognition</p>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                      Awards, research publications, and industry partnerships
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 2025 */}
              <motion.div 
                className="flex items-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1/2 pr-8 text-right">
                  <motion.div
                    className="p-4 rounded-xl cursor-pointer"
                    style={{ 
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`
                    }}
                    whileHover={{ 
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.accent,
                      boxShadow: `0 8px 25px rgba(139, 92, 246, 0.3)`
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.accent }}>2025</h3>
                    <p style={{ color: colors.textSecondary }}>Innovation & Expansion</p>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                      Leading concrete technology research and student development
                    </p>
                  </motion.div>
                </div>
                
                {/* Center Circle */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10"
                  style={{ 
                    backgroundColor: colors.accent,
                    borderColor: colors.background
                  }}
                  whileHover={{ 
                    scale: 1.5,
                    boxShadow: `0 0 20px ${colors.accent}`
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <div className="w-1/2 pl-8"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Chapter Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl transition-all duration-300 cursor-pointer"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: colors.surfaceLight,
                  boxShadow: `0 10px 30px rgba(14, 165, 233, 0.2)`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: stat.color + '20', border: `2px solid ${stat.color}` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon size={32} style={{ color: stat.color }} />
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold mb-2"
                  style={{ color: stat.color }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p style={{ color: colors.textSecondary }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Award style={{ color: colors.accent }} />
            Key Achievements & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl transition-all duration-300 cursor-pointer"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`
                }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: colors.surfaceLight,
                  borderColor: colors.primary
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <motion.h3 
                    className="text-xl font-semibold"
                    whileHover={{ color: colors.primary }}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.title}
                  </motion.h3>
                  <span 
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: colors.accent + '20',
                      color: colors.accent
                    }}
                  >
                    {achievement.year}
                  </span>
                </div>
                <p style={{ color: colors.textSecondary }}>
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-block p-8 rounded-2xl"
            style={{ background: colors.gradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-2xl font-bold mb-4">Join Our Concrete Revolution</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Be part of the next generation of concrete engineers shaping the future of construction technology at UITS.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;