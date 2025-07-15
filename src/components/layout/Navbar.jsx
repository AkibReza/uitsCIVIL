import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
            <div className="relative group">
              <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="hover:text-gray-300"
              >
                Panel
              </button>
              <div
                className={`absolute ${
                  isPanelOpen ? "block" : "hidden"
                } bg-gray-700 mt-2 py-2 w-48 rounded-md shadow-xl`}
              >
                <Link
                  to="/panel/2024-2025"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  2024 - 2025
                </Link>
                <Link
                  to="/panel/2025-2026"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  2025 - 2026
                </Link>
              </div>
            </div>
            <Link to="/achievements" className="hover:text-gray-300">
              Achievements
            </Link>
            <Link to="/events" className="hover:text-gray-300">
              Events
            </Link>
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="text-left hover:bg-gray-700 px-3 py-2"
            >
              Panel
            </button>
            {isPanelOpen && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/panel/2024-2025"
                  className="block hover:bg-gray-700 px-3 py-2"
                >
                  2024 - 2025
                </Link>
                <Link
                  to="/panel/2025-2026"
                  className="block hover:bg-gray-700 px-3 py-2"
                >
                  2025 - 2026
                </Link>
              </div>
            )}
            <Link to="/achievements" className="hover:bg-gray-700 px-3 py-2">
              Achievements
            </Link>
            <Link to="/events" className="hover:bg-gray-700 px-3 py-2">
              Events
            </Link>
            <Link to="/admin" className="hover:bg-gray-700 px-3 py-2">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
