import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">UITS CIVIL</h3>
            <p className="text-gray-300">Empowering future civil engineers</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sponsorship" className="hover:text-gray-300">
                  For Sponsorship
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="hover:text-gray-300">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/papers" className="hover:text-gray-300">
                  Papers
                </Link>
              </li>
              <li>
                <Link to="/upcoming-events" className="hover:text-gray-300">
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
