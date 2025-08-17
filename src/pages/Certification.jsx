import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, CheckCircle, BookOpen, Users, Target, TrendingUp, Shield, ChevronRight } from 'lucide-react';

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
  gradientDark: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
};

const CertificationPage = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [certificationId, setCertificationId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleVerify = () => {
    if (certificationId.trim()) {
      // Here you would typically make an API call to verify the certification
      setCurrentPage('verification-result');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  const MainPage = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Navigation */}
      

      {/* Hero Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Award size={80} className="mx-auto mb-6" style={{ color: colors.primary }} />
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
              UITS ACI Certification Portal
            </h1>
            <p className="text-xl mb-8" style={{ color: colors.textSecondary }}>
              Verify certifications and discover the value of ACI credentials in concrete technology
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mt-12"
          >
            <div 
              className="p-8 rounded-xl border hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border 
              }}
              onClick={() => setCurrentPage('verify')}
            >
              <Search size={48} className="mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                Verify Certification
              </h3>
              <p style={{ color: colors.textSecondary }}>
                Enter a certification ID to verify its authenticity and validity
              </p>
            </div>
            
            <div 
              className="p-8 rounded-xl border hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border 
              }}
              onClick={() => setCurrentPage('why-aci')}
            >
              <BookOpen size={48} className="mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                Why ACI Certification?
              </h3>
              <p style={{ color: colors.textSecondary }}>
                Learn about the benefits and importance of ACI certifications
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const VerifyPage = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ 
              color: colors.textSecondary,
              ':hover': { color: colors.primary }
            }}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
          >
            <ChevronRight size={20} className="rotate-180" />
            <span>Back to Main</span>
          </button>

          <div className="text-center mb-8">
            <Search size={64} className="mx-auto mb-4" style={{ color: colors.primary }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Verify ACI Certification
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Enter the certification ID to verify its authenticity and view details
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Certification ID
              </label>
              <input
                type="text"
                value={certificationId}
                onChange={(e) => setCertificationId(e.target.value)}
                placeholder="Enter certification ID (e.g., ACI-2024-001234)"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
              />
            </div>
            
            <motion.button
              onClick={handleVerify}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg font-medium transition-all duration-200"
              style={{ 
                background: colors.gradient,
                color: colors.text 
              }}
            >
              Verify Certification
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const WhyACIPage = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ 
              color: colors.textSecondary,
              ':hover': { color: colors.primary }
            }}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
          >
            <ChevronRight size={20} className="rotate-180" />
            <span>Back to Main</span>
          </button>

          <div className="text-center mb-12">
            <Award size={64} className="mx-auto mb-4" style={{ color: colors.accent }} />
            <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Why ACI Certification?
            </h1>
            <p className="text-xl" style={{ color: colors.textSecondary }}>
              Discover the value and benefits of American Concrete Institute certifications
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {[
              {
                icon: Target,
                color: colors.primary,
                title: "Industry Recognition",
                description: "ACI certifications are globally recognized standards in the concrete industry, demonstrating your expertise and commitment to quality."
              },
              {
                icon: TrendingUp,
                color: colors.secondary,
                title: "Career Advancement",
                description: "Certified professionals often see increased job opportunities, higher salaries, and faster career progression in construction and engineering."
              },
              {
                icon: Shield,
                color: colors.accent,
                title: "Quality Assurance",
                description: "ACI certifications ensure that concrete work meets the highest standards of safety, durability, and performance in construction projects."
              },
              {
                icon: Users,
                color: colors.primary,
                title: "Professional Network",
                description: "Join a community of certified professionals worldwide, gaining access to exclusive events, resources, and networking opportunities."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-xl border"
                style={{ 
                  backgroundColor: colors.surface,
                  borderColor: colors.border 
                }}
              >
                <benefit.icon size={32} style={{ color: benefit.color }} />
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                    {benefit.title}
                  </h3>
                  <p style={{ color: colors.textSecondary }}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div 
            className="p-8 rounded-xl border text-center"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
              Ready to Get Certified?
            </h2>
            <p className="mb-6" style={{ color: colors.textSecondary }}>
              Join thousands of professionals who have advanced their careers through ACI certification programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-medium transition-all duration-200"
              style={{ 
                background: colors.gradient,
                color: colors.text 
              }}
            >
              Learn More About Certification Programs
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const VerificationResultPage = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentPage('verify')}
            className="flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ 
              color: colors.textSecondary,
              ':hover': { color: colors.primary }
            }}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
          >
            <ChevronRight size={20} className="rotate-180" />
            <span>Back to Verify</span>
          </button>

          <div className="text-center mb-8">
            <CheckCircle size={64} className="mx-auto mb-4" style={{ color: colors.secondary }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Certification Verified
            </h1>
            <p style={{ color: colors.textSecondary }}>
              The certification ID "{certificationId}" has been successfully verified.
            </p>
          </div>

          <div 
            className="p-6 rounded-xl border space-y-4"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }}
          >
            <div className="flex justify-between items-center">
              <span style={{ color: colors.textSecondary }}>Certification Type:</span>
              <span className="font-medium" style={{ color: colors.text }}>ACI Concrete Field Testing Technician</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: colors.textSecondary }}>Issue Date:</span>
              <span className="font-medium" style={{ color: colors.text }}>January 15, 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: colors.textSecondary }}>Expiry Date:</span>
              <span className="font-medium" style={{ color: colors.text }}>January 15, 2029</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: colors.textSecondary }}>Status:</span>
              <span className="font-medium px-3 py-1 rounded-full text-sm" style={{ 
                color: colors.secondary,
                backgroundColor: `${colors.secondary}20`
              }}>
                Valid
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {currentPage === 'main' && <MainPage key="main" />}
        {currentPage === 'verify' && <VerifyPage key="verify" />}
        {currentPage === 'why-aci' && <WhyACIPage key="why-aci" />}
        {currentPage === 'verification-result' && <VerificationResultPage key="result" />}
      </AnimatePresence>
    </div>
  );
};

export default CertificationPage;