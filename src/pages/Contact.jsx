import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      // Add to Firebase Firestore
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        status: "unread",
        createdAt: serverTimestamp(),
        readAt: null,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "aci.chapter@uits.edu.bd",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      info: "+880 1XXXXXXXXX",
      description: "Call us during business hours",
    },
    {
      icon: MapPin,
      title: "Address",
      info: "Civil Engineering Department, UITS",
      description: "Baridhara, Dhaka, Bangladesh",
    },
    {
      icon: Clock,
      title: "Office Hours",
      info: "Sun - Thu: 9:00 AM - 5:00 PM",
      description: "We're here to help",
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
      {/* Header */}
      <div style={{ background: colors.gradient }}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Get in touch with the ACI Student Chapter at UITS. We&apos;re here
              to help with your concrete engineering journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <p style={{ color: colors.textSecondary }} className="mb-8 text-lg">
              Have questions about ACI, concrete technology, or want to join our
              chapter? We&apos;d love to hear from you. Reach out through any of
              the methods below.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg"
                  style={{ backgroundColor: colors.surface }}
                >
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ background: colors.gradient }}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="font-medium mb-1">{item.info}</p>
                    <p style={{ color: colors.textMuted }} className="text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-xl"
            style={{ backgroundColor: colors.surface }}
          >
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.border,
                      color: colors.text,
                      focusRingColor: colors.primary,
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent resize-vertical"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    submitStatus === "success"
                      ? "bg-green-900/50 text-green-300"
                      : "bg-red-900/50 text-red-300"
                  }`}
                >
                  {submitStatus === "success"
                    ? "Message sent successfully! We'll get back to you soon."
                    : "Error sending message. Please try again."}
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="button"
                className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2"
                style={{
                  background: isSubmitting ? colors.textMuted : colors.gradient,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
