import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p className="text-gray-600">
          © {currentYear} <span className="font-bold text-purple-600">Jatin Gupta</span>. All rights reserved.
        </p>

        <div className="flex gap-4 justify-center items-center">
          {socialLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.link} 
              target="_blank"
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
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
