import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  console.log(user);
  
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl z-20">
      <div className="container mx-auto px-6">
        {/* Top row with logo, theme toggle, and mobile menu */}
        <div className="flex justify-between items-center h-16">
          <Link to="/uitsCIVIL" className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
            UITS CIVIL
          </Link>

          {/* Theme toggle and mobile menu container */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle theme"
            >
              <svg
                className="h-5 w-5 text-yellow-400"
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
              className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
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

        {/* Desktop menu - Two rows */}
        <div className="hidden md:block pb-4">
          {/* First row of links */}
          <div className="flex justify-center items-center space-x-8 mb-3">
            <Link to="/uitsCIVIL/panel" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Panel
            </Link>
            <Link to="/uitsCIVIL/achievements" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Achievements
            </Link>
            <Link to="/uitsCIVIL/events" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Events
            </Link>
            <Link to="/uitsCIVIL/certification" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Certification
            </Link>
            <Link to="/uitsCIVIL/articles" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Articles
            </Link>
          </div>
          
          {/* Second row of links */}
          <div className="flex justify-center items-center space-x-8">
            <Link to="/uitsCIVIL/upcoming-events" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Upcoming Events
            </Link>
            <Link to="/uitsCIVIL/about" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              About Us
            </Link>
            <Link to="/uitsCIVIL/contact" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Contact
            </Link>
            <Link to="/uitsCIVIL/sponsorship" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Sponsorship
            </Link>
            <Link to="/uitsCIVIL/comments" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200 hover:scale-105">
              Reviews
            </Link>
            {user ? (
              <Link to="/uitsCIVIL/dashboard" className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
                Dashboard
              </Link>
            ) : (
              <Link to="/uitsCIVIL/login" className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg">
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4 border-t border-gray-700 mt-4`}>
          <div className="flex flex-col space-y-1 pt-4">
            <Link to="/uitsCIVIL/panel" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Panel
            </Link>
            <Link to="/uitsCIVIL/achievements" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Achievements
            </Link>
            <Link to="/uitsCIVIL/events" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Events
            </Link>
            <Link to="/uitsCIVIL/certification" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Certification
            </Link>
            <Link to="/uitsCIVIL/articles" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Articles
            </Link>
            <Link to="/uitsCIVIL/upcoming-events" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Upcoming Events
            </Link>
            <Link to="/uitsCIVIL/about" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              About Us
            </Link>
            <Link to="/uitsCIVIL/contact" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Contact
            </Link>
            <Link to="/uitsCIVIL/sponsorship" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Sponsorship
            </Link>
            <Link to="/uitsCIVIL/comments" className="text-sm font-medium hover:bg-gray-700 hover:text-blue-300 px-4 py-3 rounded-lg transition-all duration-200">
              Reviews
            </Link>
            <div className="pt-2 border-t border-gray-700 mt-2">
              {user ? (
                <Link to="/uitsCIVIL/dashboard" className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-center px-4 py-3 rounded-lg transition-all duration-200 shadow-lg">
                  Dashboard
                </Link>
              ) : (
                <Link to="/uitsCIVIL/login" className="block text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-center px-4 py-3 rounded-lg transition-all duration-200 shadow-lg">
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