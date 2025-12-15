import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../constants";

const Navbar = () => {
  const { navigation, personal } = portfolioData;
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // All available sections
  const allSections = [
    { label: "About", path: "/", type: "link", sectionId: "about" },
    { label: "Skills", sectionId: "skills", type: "scroll" },
    { label: "Work Exp", sectionId: "work-experience", type: "scroll" },
    { label: "Services", sectionId: "services", type: "scroll" },
    { label: "Projects", path: "/projects", type: "link" },
    { label: "Contact", sectionId: "contact", type: "scroll" }
  ];
  
  // Items to show in main nav (first 4)
  const mainNavItems = allSections.slice(0, 4);
  // Items to show in dropdown (remaining)
  const dropdownItems = allSections.slice(4);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section based on scroll position
      // Include all scroll sections
      const scrollSectionIds = ['about', 'skills', 'work-experience', 'services', 'contact'];
      
      const sections = scrollSectionIds
        .map(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: sectionId,
              top: rect.top,
              bottom: rect.bottom,
              height: rect.height
            };
          }
          return null;
        })
        .filter(Boolean);

      // Find the section currently in view
      const headerHeight = 80;
      const viewportOffset = headerHeight + 50; // Offset for better detection
      
      let currentSection = '';
      
      // Check if we're on a specific page
      if (location.pathname === '/contact') {
        currentSection = 'contact';
      } else if (location.pathname === '/projects') {
        currentSection = '';
      } else if (location.pathname === '/') {
        // On home page, detect which section is in view
        // Check if we're at the very top - then "about" is active
        if (window.scrollY < 150) {
          const aboutSection = sections.find(s => s.id === 'about');
          if (aboutSection && aboutSection.top < headerHeight + 200) {
            currentSection = 'about';
          }
        } else {
          // Find section that is most visible in viewport (excluding about)
          let maxVisible = 0;
          
          for (const section of sections) {
            // Skip "about" section when scrolled down
            if (section.id === 'about') continue;
            
            // Calculate how much of the section is visible
            const visibleTop = Math.max(0, section.top - viewportOffset);
            const visibleBottom = Math.min(window.innerHeight - viewportOffset, section.bottom - viewportOffset);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibleRatio = visibleHeight / section.height;
            
            // If section is significantly visible and above viewport center, it's active
            if (visibleRatio > 0.3 && section.top < window.innerHeight) {
              if (visibleRatio > maxVisible) {
                maxVisible = visibleRatio;
                currentSection = section.id;
              }
            }
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname, navigation.items]);

  const scrollToSection = (sectionId) => {
    closeSidebar();
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM to be ready
      const scrollAfterNavigation = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // If element not found, try again after a short delay
          setTimeout(scrollAfterNavigation, 50);
        }
      };
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(scrollAfterNavigation, 200);
      });
    } else {
      // Already on home page, just scroll
      const scrollToElement = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(scrollToElement);
    }
  };

  const handleContactClick = () => {
    closeSidebar();
    if (location.pathname !== '/contact') {
      navigate('/contact');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Already on contact page, just scroll
      const element = document.getElementById('contact');
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };


  return (
    <>
      <motion.header 
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='header-content'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to='/' className="logo-container">
              <span className="logo-text">{personal.logoText}</span>
            </NavLink>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className='hidden md:flex text-sm lg:text-base gap-1 lg:gap-2 font-medium items-center justify-end relative'>
            {mainNavItems.map((item, index) => {
              if (item.type === 'link') {
                const isActive = item.sectionId === 'about' 
                  ? activeSection === 'about' && location.pathname === '/'
                  : location.pathname === item.path;
                return (
                  <NavLink 
                    key={index}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-purple-600 font-semibold" 
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              } else if (item.type === 'scroll') {
                const handleClick = () => {
                  if (item.sectionId === 'contact') {
                    handleContactClick();
                  } else {
                    scrollToSection(item.sectionId);
                  }
                };
                const isActive = activeSection === item.sectionId;
                return (
                  <motion.button 
                    key={index}
                    onClick={handleClick}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? "text-purple-600 font-semibold" 
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        layoutId="activeScrollIndicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              }
              return null;
            })}
            
            {/* Dropdown for additional items */}
            {dropdownItems.length > 0 && (
              <div className="relative dropdown-container">
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                    dropdownItems.some(item => 
                      (item.type === 'link' && location.pathname === item.path) ||
                      (item.type === 'scroll' && activeSection === item.sectionId)
                    )
                      ? "text-purple-600 font-semibold" 
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  More
                  <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-purple-100 overflow-hidden z-50"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      {dropdownItems.map((item, index) => {
                        if (item.type === 'link') {
                          const isActive = location.pathname === item.path;
                          return (
                            <NavLink
                              key={index}
                              to={item.path}
                              onClick={() => setIsDropdownOpen(false)}
                              className={`block px-4 py-3 text-sm transition-colors ${
                                isActive
                                  ? "text-purple-600 font-semibold bg-purple-50"
                                  : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                              }`}
                            >
                              {item.label}
                            </NavLink>
                          );
                        } else if (item.type === 'scroll') {
                          const handleClick = () => {
                            setIsDropdownOpen(false);
                            if (item.sectionId === 'contact') {
                              handleContactClick();
                            } else {
                              scrollToSection(item.sectionId);
                            }
                          };
                          const isActive = activeSection === item.sectionId;
                          return (
                            <button
                              key={index}
                              onClick={handleClick}
                              className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                                isActive
                                  ? "text-purple-600 font-semibold bg-purple-50"
                                  : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2.5 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isSidebarOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isSidebarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden overflow-y-auto border-r border-purple-100"
            >
              {/* Sidebar Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5 border-b border-purple-200/50 backdrop-blur-sm z-10">
                <div className="flex items-center justify-between">
                  <NavLink to='/' onClick={closeSidebar} className="logo-container inline-flex bg-white/20 backdrop-blur-sm">
                    <span className="logo-text text-white">{personal.logoText}</span>
                  </NavLink>
                  <motion.button
                    onClick={closeSidebar}
                    className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col py-4">
                {allSections.map((item, index) => {
                  if (item.type === 'link') {
                    const isActive = item.sectionId === 'about' 
                      ? activeSection === 'about' && location.pathname === '/'
                      : location.pathname === item.path;
                    return (
                      <NavLink 
                        key={index}
                        to={item.path}
                        onClick={closeSidebar}
                        className={`relative mx-4 my-1 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive 
                            ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg" 
                            : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                      >
                        {item.label}
                      </NavLink>
                    );
                  } else if (item.type === 'scroll') {
                    const handleClick = () => {
                      closeSidebar();
                      if (item.sectionId === 'contact') {
                        handleContactClick();
                      } else {
                        scrollToSection(item.sectionId);
                      }
                    };
                    const isActive = activeSection === item.sectionId;
                    return (
                      <motion.button 
                        key={index}
                        onClick={handleClick}
                        className={`mx-4 my-1 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-left ${
                          isActive 
                            ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg font-semibold" 
                            : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.button>
                    );
                  }
                  return null;
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
