import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Cruises', path: '/cruises' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] transition-colors transition-shadow duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4 md:py-6'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative z-50 group">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl transition-colors ${isScrolled || !isHomePage ? 'bg-amber-600' : 'bg-amber-600 group-hover:bg-amber-500'
              }`}>
              DT
            </div>
            <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors ${isScrolled || !isHomePage ? 'text-stone-900' : 'text-white'
              }`}>
              Discover<span className="text-amber-500">Tours</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-amber-500 relative group ${isScrolled || !isHomePage ? 'text-stone-600' : 'text-stone-200'
                }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <button
            onClick={() => navigate('/tours/1')} // Example booking
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 ${isScrolled || !isHomePage
              ? 'bg-stone-900 text-white hover:bg-amber-600 shadow-md'
              : 'bg-white text-stone-900 hover:bg-amber-50 hover:text-amber-600'
              }`}
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 items-end">
            <span className={`h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'w-8 bg-stone-900 rotate-45 translate-y-2' : isScrolled || !isHomePage ? 'w-8 bg-stone-900' : 'w-8 bg-white'}`}></span>
            <span className={`h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : isScrolled || !isHomePage ? 'w-6 bg-stone-900' : 'w-6 bg-white'}`}></span>
            <span className={`h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'w-8 bg-stone-900 -rotate-45 -translate-y-2' : isScrolled || !isHomePage ? 'w-4 bg-stone-900' : 'w-4 bg-white'}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-stone-50 z-40 flex flex-col items-center justify-center transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
          <div className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-3xl font-serif font-bold text-stone-900 hover:text-amber-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                navigate('/tours/1');
                setIsMenuOpen(false);
              }}
              className="mt-8 bg-amber-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-amber-700 transition-all shadow-xl"
            >
              Book an Adventure
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
