import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user } = useAuth();
  const { isDark, theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${theme.navbar.background} ${theme.navbar.text} ${theme.navbar.shadow} z-20`}
    >
      <div className="container mx-auto px-6 py-3">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-8 min-h-[60px]">
          {/* Column 1: Logo */}
          <div className="flex justify-start items-center">
            <Link
              to="/uitsCIVIL"
              className={`font-bold text-2xl ${theme.logo.gradient} ${theme.logo.textClip} hover:scale-105 transition-transform duration-200`}
            >
              UITS CIVIL
            </Link>
          </div>

          {/* Column 2: Navigation Links (2 rows) */}
          <div className="flex flex-col justify-center items-center space-y-2">
            {/* First row of links */}
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
              <Link
                to="/uitsCIVIL/panel"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Panel
              </Link>
              <Link
                to="/uitsCIVIL/achievements"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Achievements
              </Link>
              <Link
                to="/uitsCIVIL/events"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Events
              </Link>
              <Link
                to="/uitsCIVIL/certification"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Certification
              </Link>
              <Link
                to="/uitsCIVIL/articles"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Articles
              </Link>
            </div>

            {/* Second row of links */}
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
              <Link
                to="/uitsCIVIL/upcoming-events"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Upcoming Events
              </Link>
              <Link
                to="/uitsCIVIL/about"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                About Us
              </Link>
              <Link
                to="/uitsCIVIL/contact"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Contact
              </Link>
              <Link
                to="/uitsCIVIL/sponsorship"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Sponsorship
              </Link>
              <Link
                to="/uitsCIVIL/comments"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              >
                Reviews
              </Link>
              {user ? (
                <Link
                  to="/uitsCIVIL/dashboard"
                  className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/uitsCIVIL/login"
                  className={`text-sm font-medium px-4 py-1.5 rounded-lg ${theme.navLinks.hover} transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>

          {/* Column 3: Theme Toggle */}
          <div className="flex justify-end items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme.buttons.toggle.background} ${theme.buttons.toggle.hover} transition-colors duration-200 focus:outline-none focus:ring-2 ${theme.buttons.toggle.ring}`}
              aria-label="Toggle theme"
            >
              <svg
                className={`h-5 w-5 ${theme.buttons.toggle.text}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {isDark ? (
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                )}
              </svg>
            </button>
          </div>
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
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme.buttons.toggle.background} ${theme.buttons.toggle.hover} transition-colors duration-200 focus:outline-none focus:ring-2 ${theme.buttons.toggle.ring}`}
              aria-label="Toggle theme"
            >
              <svg
                className={`h-4 w-4 ${theme.buttons.toggle.text}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {isDark ? (
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                )}
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${theme.buttons.toggle.background} ${theme.buttons.toggle.hover} transition-colors duration-200 focus:outline-none focus:ring-2 ${theme.buttons.toggle.ring}`}
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
            <Link
              to="/uitsCIVIL/panel"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Panel
            </Link>
            <Link
              to="/uitsCIVIL/achievements"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Achievements
            </Link>
            <Link
              to="/uitsCIVIL/events"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Events
            </Link>
            <Link
              to="/uitsCIVIL/certification"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Certification
            </Link>
            <Link
              to="/uitsCIVIL/articles"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Articles
            </Link>
            <Link
              to="/uitsCIVIL/upcoming-events"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Upcoming Events
            </Link>
            <Link
              to="/uitsCIVIL/about"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              About Us
            </Link>
            <Link
              to="/uitsCIVIL/contact"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Contact
            </Link>
            <Link
              to="/uitsCIVIL/sponsorship"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Sponsorship
            </Link>
            <Link
              to="/uitsCIVIL/comments"
              className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
            >
              Reviews
            </Link>
            <div className={`pt-2 ${theme.mobileMenu.border} mt-2 border-t`}>
              {user ? (
                <Link
                  to="/uitsCIVIL/dashboard"
                  className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/uitsCIVIL/login"
                  className={`text-sm font-medium ${theme.mobileMenu.linkHover} px-4 py-2.5 rounded-lg transition-all duration-200`}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
