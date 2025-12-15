import { Link } from "react-router-dom";
import { useState } from "react";

import { socialLinks, portfolioData } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personal } = portfolioData;
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  const handlePhoneClick = (e) => {
    e.preventDefault();
    setShowPhoneMenu(!showPhoneMenu);
  };

  const handlePhoneNumberClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
    setShowPhoneMenu(false);
  };

  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p className="text-gray-600">
          © {currentYear} <span className="font-bold text-purple-600">{personal.name}</span>. All rights reserved.
        </p>

        <div className="flex gap-4 justify-center items-center">
          {socialLinks.map((link) => {
            // Handle phone links specially
            if (link.type === 'phone') {
              return (
                <div key={link.name} className="relative">
                  <button
                    onClick={handlePhoneClick}
                    className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-white/80 hover:scale-110 active:scale-95"
                  >
                    <img
                      src={link.iconUrl}
                      alt={link.name}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-300">
                      {link.name}
                    </span>
                  </button>
                  
                  {/* Phone numbers dropdown */}
                  {showPhoneMenu && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-[200px] z-50">
                      <div className="text-xs font-semibold text-gray-500 mb-2 px-2">Call on:</div>
                      {personal.phoneNumbers.map((phoneNumber, index) => (
                        <button
                          key={index}
                          onClick={() => handlePhoneNumberClick(phoneNumber)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {phoneNumber}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Handle regular links
            if (link.link.startsWith('tel:')) {
              return (
                <a
                  key={link.name}
                  href={link.link}
                  className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-white/80 hover:scale-110 active:scale-95"
                >
                  <img
                    src={link.iconUrl}
                    alt={link.name}
                    className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-300">
                    {link.name}
                  </span>
                </a>
              );
            }

            return (
              <Link 
                key={link.name} 
                to={link.link} 
                target={link.link.startsWith('http') ? "_blank" : undefined}
                rel={link.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-white/80 hover:scale-110 active:scale-95"
              >
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-300">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Click outside to close phone menu */}
      {showPhoneMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPhoneMenu(false)}
        />
      )}
    </footer>
  );
};

export default Footer;
