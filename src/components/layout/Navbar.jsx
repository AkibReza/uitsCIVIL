import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/uitsCIVIL" className="font-bold text-xl">
            UITS CIVIL
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
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

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/uitsCIVIL/panel" className="hover:text-gray-300">
              Panel
            </Link>
            <Link to="/uitsCIVIL/achievements" className="hover:text-gray-300">
              Achievements
            </Link>
            <Link to="/uitsCIVIL/events" className="hover:text-gray-300">
              Events
            </Link>
            <Link to="/uitsCIVIL/certification" className="hover:text-gray-300">
              Certification
            </Link>
            <Link to="/uitsCIVIL/articles" className="hover:text-gray-300">
              Articles
            </Link>
            <Link
              to="/uitsCIVIL/upcoming-events"
              className="hover:text-gray-300"
            >
              Upcoming Events
            </Link>
            <Link to="/uitsCIVIL/about" className="hover:text-gray-300">
              About us
            </Link>
            <Link to="/uitsCIVIL/contact" className="hover:text-gray-300">
              Contact us
            </Link>
            <Link to="/uitsCIVIL/sponsorship" className="hover:text-gray-300">
              For Sponsorship
            </Link>
            <Link to="/uitsCIVIL/comments" className="hover:text-gray-300">
              Comments & Reviews
            </Link>
            <Link to="/uitsCIVIL/login" className="hover:text-gray-300">
              Log in
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link to="/uitsCIVIL/panel" className="hover:bg-gray-700 px-3 py-2">
              Panel
            </Link>
            <Link
              to="/uitsCIVIL/achievements"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Achievements
            </Link>
            <Link
              to="/uitsCIVIL/events"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Events
            </Link>
            <Link
              to="/uitsCIVIL/certification"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Certification
            </Link>
            <Link to="/uitsCIVIL/articles" className="hover:text-gray-300">
              Articles
            </Link>
            <Link
              to="/uitsCIVIL/upcoming-events"
              className="hover:text-gray-300"
            >
              Upcoming Events
            </Link>
            <Link to="/uitsCIVIL/about" className="hover:bg-gray-700 px-3 py-2">
              About us
            </Link>
            <Link
              to="/uitsCIVIL/contact"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Contact
            </Link>
            <Link
              to="/uitsCIVIL/sponsorship"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Sponsorship
            </Link>
            <Link
              to="/uitsCIVIL/comments"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Comments & Reviews
            </Link>
            <Link
              to="/uitsCIVIL/login"
              className="hover:bg-gray-700 px-3 py-2"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
