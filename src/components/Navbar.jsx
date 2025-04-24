import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#7E57C2] to-[#2196F3] shadow-lg backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-3xl font-bold font-montserrat">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFECB3]">
                femSpace
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-8 items-center">
            <li className="hover:-translate-y-0.5 transition-transform duration-300">
              <Link
                to="/"
                className="text-white/90 hover:text-[#FFECB3] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="hover:-translate-y-0.5 transition-transform duration-300">
              <Link
                to="/locator"
                className="text-white/90 hover:text-[#FFECB3] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300"
              >
                Find Washrooms
              </Link>
            </li>
            <li className="hover:-translate-y-0.5 transition-transform duration-300">
              <a
                href="#about"
                className="text-white/90 hover:text-[#FFECB3] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li className="hover:-translate-y-0.5 transition-transform duration-300">
              <a
                href="#contact"
                className="text-white/90 hover:text-[#FFECB3] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}