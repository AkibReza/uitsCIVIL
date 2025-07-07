import { Link } from "react-router-dom";
import { Shield, MessageCircle, Users, Calendar } from "lucide-react";
const Footer = () => {
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
  return (
    <footer
      className="py-16 border-t"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">ACI Chapter</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Building the future of concrete technology through education,
              research, and innovation.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/research"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="/publications"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="/workshops"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Workshops
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Membership
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>Department of Civil Engineering</p>
              <p>University Campus</p>
              <p>Email: info@acichapter.edu</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ACI Student Chapter. All rights reserved. |
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1">
              Privacy Policy
            </span>{" "}
            |
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1">
              Terms of Service
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
