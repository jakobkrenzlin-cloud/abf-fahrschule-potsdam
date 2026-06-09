
import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      // We're on the main page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // We're on a different page, navigate to main page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* Logo - 30% smaller on mobile */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/043122ac-3ad6-402e-85ea-565401e53982.png"
                alt="ABF Fahrschule Potsdam Logo - Professionelle Fahrausbildung"
                className="h-14 md:h-20 w-auto"
                loading="eager"
                fetchPriority="high"
                title="ABF Fahrschule Potsdam - Ihr vertrauensvoller Partner für den Führerschein"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigateToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => navigateToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Über uns
            </button>
            <button onClick={() => navigateToSection('process')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Führerschein
            </button>
            <a href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bewertungen
            </a>
            <Link to="/karriere" className="text-gray-700 hover:text-blue-600 transition-colors">
              Karriere
            </Link>
            <button onClick={() => navigateToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Kontakt
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigateToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Jetzt anfragen</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => navigateToSection('home')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => navigateToSection('about')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Über uns
            </button>
            <button onClick={() => navigateToSection('process')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Führerschein
            </button>
            <a href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Bewertungen
            </a>
            <Link to="/karriere" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Karriere
            </Link>
            <button onClick={() => navigateToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Kontakt
            </button>
            <div className="px-3 py-2">
              <button 
                onClick={() => navigateToSection('contact')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Jetzt anfragen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
