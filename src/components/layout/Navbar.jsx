import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === "/uitsCIVIL" || location.pathname === "/uitsCIVIL/";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest(".sidebar") && !event.target.closest(".menu-button")) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/uitsCIVIL/panel", label: "Panel" },
    { to: "/uitsCIVIL/achievements", label: "Achievements" },
    { to: "/uitsCIVIL/events", label: "Events" },
    { to: "/uitsCIVIL/certification", label: "Certification" },
    { to: "/uitsCIVIL/articles", label: "Articles" },
    { to: "/uitsCIVIL/upcoming-events", label: "Upcoming Events" },
    { to: "/uitsCIVIL/about", label: "About Us" },
    { to: "/uitsCIVIL/contact", label: "Contact" },
    { to: "/uitsCIVIL/sponsorship", label: "Sponsorship" },
    { to: "/uitsCIVIL/comments", label: "Reviews" },
  ];

  const authLink = user
    ? { to: "/uitsCIVIL/dashboard", label: "Dashboard" }
    : { to: "/uitsCIVIL/login", label: "Log In" };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage && !scrolled
            ? "bg-transparent"
            : `${theme.navbar.background} ${theme.navbar.shadow}`
        } ${theme.navbar.text}`}
      >
        <div className="container mx-auto px-6">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between" style={{ height: scrolled ? '60px' : '80px', transition: 'height 0.3s ease' }}>
            {/* Logo */}
            <div className="flex justify-start items-center">
              <Link
                to="/uitsCIVIL"
                className={`font-bold text-2xl ${theme.logo.gradient} ${theme.logo.textClip} hover:scale-105 transition-transform duration-200`}
              >
                UITS CIVIL
              </Link>
            </div>

            {/* Navigation Links - Show when not scrolled */}
            {!scrolled && (
              <div className="flex flex-col justify-center items-center space-y-2 flex-1 mx-8">
                {/* First row of links */}
                <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
                  {navLinks.slice(0, 5).map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Second row of links */}
                <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
                  {navLinks.slice(5).map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to={authLink.to}
                    className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                  >
                    {authLink.label}
                  </Link>
                </div>
              </div>
            )}

            {/* Menu Button - Show when scrolled */}
            {scrolled && (
              <div className="flex justify-end items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="menu-button p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Layout - Single row with hamburger */}
          <div className="md:hidden flex justify-between items-center h-12">
            <Link
              to="/uitsCIVIL"
              className={`font-bold text-xl ${theme.logo.gradient} ${theme.logo.textClip} hover:scale-105 transition-transform duration-200`}
            >
              UITS CIVIL
            </Link>

            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`${isOpen ? "block" : "hidden"} md:hidden pb-3 ${
              theme.mobileMenu.border
            } mt-3 ${theme.mobileMenu.background} border-t`}
          >
            <div className="flex flex-col space-y-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`pt-2 ${theme.mobileMenu.border} mt-2 border-t`}>
                <Link
                  to={authLink.to}
                  className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
                >
                  {authLink.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar - Slide from right */}
      <div
        className={`sidebar fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } hidden md:block`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Navigation
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-700">
              <Link
                to={authLink.to}
                className="text-sm font-medium px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white block text-center"
              >
                {authLink.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 hidden md:block"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
