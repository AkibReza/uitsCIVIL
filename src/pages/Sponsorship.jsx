import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Users,
  Award,
  Target,
  Heart,
  Handshake,
} from "lucide-react";

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

const ForSponsorship = () => {
  const navigate = useNavigate();

  const handleContactRedirect = () => {
    navigate("/contact");
  };

  const sponsorshipBenefits = [
    {
      icon: Building2,
      title: "Brand Visibility",
      description:
        "Showcase your company to future engineers and industry professionals through our events and activities.",
    },
    {
      icon: Users,
      title: "Talent Pipeline",
      description:
        "Connect directly with motivated civil engineering students for internships and future employment opportunities.",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description:
        "Position your organization as a leader in concrete technology and engineering innovation.",
    },
    {
      icon: Target,
      title: "Targeted Audience",
      description:
        "Reach a focused group of concrete engineering enthusiasts and future industry professionals.",
    },
  ];

  const sponsorshipTiers = [
    {
      tier: "Gold Sponsor",
      amount: "$5,000+",
      benefits: [
        "Logo on all event materials",
        "Speaking opportunity at events",
        "Dedicated booth space",
        "Student resume database access",
        "Social media recognition",
      ],
    },
    {
      tier: "Silver Sponsor",
      amount: "$2,500+",
      benefits: [
        "Logo on select materials",
        "Booth space at major events",
        "Newsletter recognition",
        "Limited resume access",
      ],
    },
    {
      tier: "Bronze Sponsor",
      amount: "$1,000+",
      benefits: [
        "Logo on website",
        "Social media mentions",
        "Event recognition",
        "Networking opportunities",
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
      }}
    >
      {/* Hero Section */}
      <div style={{ background: colors.gradient }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Handshake className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partner With Us
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Join the ACI Student Chapter at UITS in shaping the future of
              concrete engineering. Support the next generation of civil
              engineers while advancing your business goals.
            </p>
            <motion.button
              onClick={handleContactRedirect}
              className="inline-flex items-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Become a Sponsor</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Why Sponsor Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Why Sponsor ACI UITS?</h2>
          <p
            style={{ color: colors.textSecondary }}
            className="text-xl max-w-3xl mx-auto"
          >
            Your sponsorship directly impacts the education and development of
            future concrete engineers, while providing valuable benefits for
            your organization.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {sponsorshipBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 rounded-xl"
              style={{ backgroundColor: colors.surface }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: colors.gradient }}
              >
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p
                style={{ color: colors.textSecondary }}
                className="text-sm leading-relaxed"
              >
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sponsorship Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Sponsorship Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`p-8 rounded-xl border-2 ${
                  index === 0
                    ? "border-yellow-400"
                    : index === 1
                    ? "border-gray-400"
                    : "border-orange-400"
                }`}
                style={{ backgroundColor: colors.surface }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    {tier.amount}
                  </p>
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-start space-x-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <span
                        style={{ color: colors.textSecondary }}
                        className="text-sm"
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-12 rounded-xl"
          style={{ background: colors.gradientDark }}
        >
          <Heart
            className="w-12 h-12 mx-auto mb-6"
            style={{ color: colors.primary }}
          />
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p
            style={{ color: colors.textSecondary }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Join us in building the future of concrete engineering. Your
            sponsorship helps students gain valuable experience, access to
            industry experts, and cutting-edge knowledge in concrete technology.
          </p>
          <motion.button
            onClick={handleContactRedirect}
            className="inline-flex items-center space-x-2 px-10 py-4 rounded-lg font-semibold text-lg text-white transition-all duration-200"
            style={{ background: colors.gradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Us Today</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ForSponsorship;
