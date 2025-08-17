import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">
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
            <Link to="/panel" className="hover:text-gray-300">
              Panel
            </Link>
            <Link to="/achievements" className="hover:text-gray-300">
              Achievements
            </Link>
            <Link to="/events" className="hover:text-gray-300">
              Events
            </Link>
            <Link to="/articles" className="hover:text-gray-300">
              Articles
            </Link>
            <Link to="/upcoming-events" className="hover:text-gray-300">
              Upcoming Events
            </Link>
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About us
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact us
            </Link>
            <Link to="/sponsorship" className="hover:text-gray-300">
              For Sponsorship
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link to="/achievements" className="hover:bg-gray-700 px-3 py-2">
              Achievements
            </Link>
            <Link to="/events" className="hover:bg-gray-700 px-3 py-2">
              Events
            </Link>
            <Link to="/articles" className="hover:text-gray-300">
              Articles
            </Link>
            <Link to="/upcoming-events" className="hover:text-gray-300">
              Upcoming Events
            </Link>
            <Link to="/admin" className="hover:bg-gray-700 px-3 py-2">
              Admin
            </Link>
            <Link to="/about" className="hover:bg-gray-700 px-3 py-2">
              About us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
