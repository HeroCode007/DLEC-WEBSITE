import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const services = [
  { name: 'Temperature Calibration', path: '/services/temperature-calibration' },
  { name: 'Pressure Calibration', path: '/services/line-length-calibration' },
  { name: 'Weighing & Scales Calibration', path: '/services/weighing-scales-calibration' },
  { name: 'Sound Level Calibration', path: '/services/sound-level-calibration' },
  { name: 'Light/Lux Meter Calibration', path: '/services/light-lux-calibration' },
  { name: 'Flow Equipment Calibration', path: '/services/flow-equipment-calibration' },
  { name: 'Electrical Test Equipment Calibration', path: '/services/electrical-test-calibration' },
  { name: 'Force Calibration', path: '/services/force-calibration' },
  { name: 'Glass Ware Calibration', path: '/services/construction-calibration' },
  { name: 'Line Length and Dimensions', path: '/services/line-length-dimensions-calibration' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsServicesOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ${
        isScrolled ? 'h-[4.5rem] py-1' : 'h-[7rem] py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full relative">

          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2 min-w-0 max-w-[85%] sm:max-w-none">
            <img
              src="https://i.postimg.cc/yNv6qThw/dleclogo.png"
              alt="DLEC Logo"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'h-12 sm:h-14' : 'h-16 sm:h-20'
              }`}
            />
            <span className="text-sm sm:text-base md:text-lg font-bold text-black leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Direct Line Engineering Corporation
            </span>
          </Link>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:text-blue-700"
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={isActive('/') ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700'}>
              Home
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-blue-700"
                onClick={() => setIsServicesOpen(prev => !prev)}
              >
                Services <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {services.map(service => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive(service.path)
                            ? 'text-blue-700 font-semibold'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/about" className={isActive('/about') ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700'}>
              About
            </Link>
            <Link to="/contact" className={isActive('/contact') ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700'}>
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-700">
                Home
              </Link>
              <div>
                <div className="text-gray-900 font-medium mb-2">Services</div>
                <div className="pl-4 space-y-1">
                  {services.map(service => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-1 text-sm ${
                        isActive(service.path)
                          ? 'text-blue-700 font-semibold'
                          : 'text-gray-600 hover:text-blue-700'
                      }`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-700">
                About
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-700">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
