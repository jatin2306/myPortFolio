import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import { CTA } from "../components";
import { experiences, portfolioData, skills, services } from "../constants";

import About from "./About";

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <motion.div
        className={`h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 flex flex-col cursor-pointer ${
          isExpanded 
            ? 'shadow-2xl -translate-y-2 z-50' 
            : 'group-hover:shadow-2xl group-hover:-translate-y-2'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{
          scale: isExpanded ? 1.02 : 1,
        }}
        layout
      >
        {/* Image Section with Overlay */}
        <div className={`relative overflow-hidden transition-all duration-500 ${
          isExpanded ? 'h-64 sm:h-72' : 'h-48 sm:h-56'
        }`}>
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
              isExpanded ? 'opacity-80' : 'opacity-60 group-hover:opacity-70'
            }`}
          />
          {/* Icon Badge */}
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-md bg-white/95 border-2 border-white/50"
              style={{
                boxShadow: `0 4px 20px ${service.iconBg}40`,
              }}
              animate={{
                scale: isExpanded ? 1.15 : 1,
                rotate: isExpanded ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </motion.div>
          </div>
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
            <h3 className={`text-white font-bold font-poppins drop-shadow-lg transition-all duration-300 ${
              isExpanded ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl line-clamp-2'
            }`}>
              {service.title}
            </h3>
          </div>
          {/* Expand Indicator */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          className="p-4 sm:p-5 flex-1 flex flex-col"
          animate={{
            height: 'auto',
          }}
        >
          <motion.p
            className={`text-sm sm:text-base text-gray-600 leading-relaxed flex-1 transition-all duration-300 ${
              isExpanded ? 'line-clamp-none' : 'line-clamp-3'
            }`}
            animate={{
              opacity: 1,
            }}
          >
            {service.description}
          </motion.p>
          
          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: service.iconBg }}
                  />
                  <span>Click to collapse</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative Accent */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <motion.div 
              className="h-1 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: service.iconBg,
                width: isExpanded ? '100%' : '4rem'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Backdrop for expanded card on mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MySkills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredSkillKey, setHoveredSkillKey] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, showAbove: false });
  const skillRefs = useRef({});
  const [showAllServices, setShowAllServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Skills to display in carousel (responsive)
  const [skillsPerView, setSkillsPerView] = useState(5);
  const totalSlides = Math.ceil(skills.length / skillsPerView);

  // Responsive skills per view and mobile detection
  useEffect(() => {
    const updateSkillsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSkillsPerView(2); // Mobile: 2 skills
        setIsMobile(true);
      } else {
        setIsMobile(false);
        if (width < 1024) {
          setSkillsPerView(3); // Tablet: 3 skills
        } else {
          setSkillsPerView(5); // Desktop: 5 skills
        }
      }
      setCurrentIndex(0); // Reset to first slide on resize
    };

    updateSkillsPerView();
    window.addEventListener("resize", updateSkillsPerView);
    return () => window.removeEventListener("resize", updateSkillsPerView);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, skillsPerView]);

  // Calculate tooltip position when skill is hovered
  useEffect(() => {
    if (hoveredSkillKey) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        updateTooltipPosition(hoveredSkillKey);
      });
    }
  }, [hoveredSkillKey]);

  // Update tooltip position on scroll/resize when tooltip is visible
  useEffect(() => {
    if (!hoveredSkillKey) return;

    const handleUpdate = () => {
      updateTooltipPosition(hoveredSkillKey);
    };

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [hoveredSkillKey]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const updateTooltipPosition = (skillKey) => {
    const element = skillRefs.current[skillKey];
    if (element) {
      const rect = element.getBoundingClientRect();
      const isMobile = window.innerWidth < 640;
      const tooltipWidth = isMobile ? 120 : 150; // Smaller on mobile
      const tooltipHeight = isMobile ? 55 : 65; // Smaller on mobile
      const spacing = isMobile ? 6 : 8;
      
      // For fixed positioning, use viewport coordinates (getBoundingClientRect already gives viewport coords)
      let left = rect.left + rect.width / 2;
      let top = rect.bottom + spacing;
      let showAbove = false;
      
      // Adjust for mobile viewport boundaries
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = isMobile ? 8 : 10;
      
      // Prevent tooltip from going off-screen horizontally
      if (left - tooltipWidth / 2 < margin) {
        left = tooltipWidth / 2 + margin;
      } else if (left + tooltipWidth / 2 > viewportWidth - margin) {
        left = viewportWidth - tooltipWidth / 2 - margin;
      }
      
      // If tooltip would go off bottom, show it above instead
      if (rect.bottom + spacing + tooltipHeight > viewportHeight - margin) {
        top = rect.top - tooltipHeight - spacing;
        showAbove = true;
      }
      
      setTooltipPosition({ top, left, showAbove });
    }
  };

  const handleSkillMouseEnter = (skill, skillKey) => {
    setHoveredSkill(skill);
    setHoveredSkillKey(skillKey);
  };

  const handleSkillMouseLeave = () => {
    setHoveredSkill(null);
    setHoveredSkillKey(null);
  };

  const handleSkillTouchStart = (skill, skillKey, e) => {
    e.preventDefault();
    setHoveredSkill(skill);
    setHoveredSkillKey(skillKey);
  };

  const handleSkillTouchEnd = () => {
    // Delay hiding on mobile to allow user to see the tooltip
    setTimeout(() => {
      setHoveredSkill(null);
      setHoveredSkillKey(null);
    }, 2000);
  };


  return (
    <>
      <About />
      <section className="max-container !pt-0">
        <div id="skills" className="pt-0 pb-4 sm:pb-10 flex flex-col">
          <div className="flex flex-col items-center mb-4 sm:mb-8 px-3 sm:px-2">
            <h3 className="subhead-text text-center text-2xl sm:text-3xl">{portfolioData.sections.skills.heading}</h3>
            <p className="text-gray-600 mt-2 sm:mt-3 text-center max-w-2xl px-2 text-xs sm:text-sm md:text-base leading-relaxed">
              {portfolioData.sections.skills.description}
            </p>
          </div>

          {/* Enhanced Carousel Container */}
          <div className="mt-4 sm:mt-16 px-1 sm:px-0">
            <div className="relative mb-4 sm:mb-8">
              {/* Enhanced Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-6 z-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shadow-md hover:shadow-2xl active:scale-95 transition-all duration-300 group touch-manipulation border-2 border-white"
                aria-label="Previous skills"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-6 z-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shadow-md hover:shadow-2xl active:scale-95 transition-all duration-300 group touch-manipulation border-2 border-white"
                aria-label="Next skills"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="overflow-hidden px-2 sm:px-8 md:px-12 lg:px-16">
                <div
                  ref={carouselRef}
                  className="flex transition-transform ease-in-out"
                  style={{
                    transitionDuration: "700ms",
                    transform: `translateX(-${currentIndex * 100}%)`,
                    minHeight: '140px'
                  }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                    const startIndex = slideIndex * skillsPerView;
                    let slideSkills = skills.slice(
                      startIndex,
                      startIndex + skillsPerView
                    );
                    
                    // If last slide has fewer items, wrap around to beginning to fill it
                    if (slideSkills.length < skillsPerView) {
                      const remainingItems = skillsPerView - slideSkills.length;
                      slideSkills = [
                        ...slideSkills,
                        ...skills.slice(0, remainingItems)
                      ];
                    }
                    
                    return (
                      <div
                        key={slideIndex}
                        className="flex gap-3 sm:gap-5 md:gap-7 justify-center items-center min-w-full flex-shrink-0 px-3 sm:px-4 overflow-visible"
                        style={{ height: '100%', minHeight: 0 }}
                      >
                        {slideSkills.map((skill, skillIndex) => {
                          const skillKey = `${slideIndex}-${skillIndex}-${skill.name}`;
                          return (
                            <motion.div
                              key={skillKey}
                              className="flex-shrink-0 flex-1 min-w-[120px] sm:min-w-[130px] max-w-[140px] sm:max-w-[180px] relative overflow-visible"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                            >
                              <motion.div 
                                ref={(el) => (skillRefs.current[skillKey] = el)}
                                className="relative group w-full aspect-square cursor-pointer"
                                onMouseEnter={() => handleSkillMouseEnter(skill, skillKey)}
                                onMouseLeave={handleSkillMouseLeave}
                                onTouchStart={(e) => handleSkillTouchStart(skill, skillKey, e)}
                                onTouchEnd={handleSkillTouchEnd}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{ height: '100%' }}
                              >
                                {/* Gradient border wrapper */}
                                <div className="absolute -inset-[2px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                
                                {/* Main card */}
                                <div className="relative h-full w-full rounded-xl sm:rounded-2xl bg-white shadow-md sm:shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 group-hover:border-purple-300 overflow-hidden" style={{ minHeight: 0 }}>
                                  {/* Background gradient on hover */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-white to-pink-50/0 group-hover:from-purple-50/60 group-hover:via-white group-hover:to-pink-50/60 transition-all duration-300"></div>
                                  
                                  {/* Image container */}
                                  <div className="relative h-full w-full flex flex-col justify-center items-center p-3 sm:p-5 md:p-6 z-10 overflow-hidden" style={{ minHeight: 0 }}>
                                    <motion.img
                                      src={skill.imageUrl}
                                      alt={skill.name}
                                      className="w-full h-full object-contain transition-all duration-300 group-hover:opacity-20 group-active:opacity-20"
                                      loading="lazy"
                                      whileHover={{ scale: 1.08 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      onError={(e) => {
                                        e.target.style.opacity = '0';
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Skill name overlay - appears on hover/touch */}
                                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 px-2 sm:px-3 pointer-events-none" style={{ minHeight: 0 }}>
                                    <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1 text-center leading-tight line-clamp-2 break-words max-w-full">
                                      {skill.name}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-medium uppercase tracking-wider text-center line-clamp-1">
                                      {skill.type}
                                    </span>
                                  </div>
                                  
                                  {/* Animated bottom accent bar */}
                                  <div className="absolute bottom-0 left-0 right-0 h-[3px] sm:h-[4px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-center"></div>
                                </div>
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Carousel Dots */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-3 mt-4 sm:mt-10 px-2 sm:px-4">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-500 rounded-full touch-manipulation ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#c4b5fd] to-[#9333ea] w-6 h-2 sm:w-10 sm:h-2.5 shadow-md sm:shadow-lg shadow-purple-400/50"
                      : "bg-purple-200 w-1.5 h-1.5 sm:w-2 sm:h-2 hover:bg-purple-300 hover:w-2.5 hover:h-2.5 sm:hover:w-3 sm:hover:h-3 active:bg-purple-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div id="work-experience" className="py-8 md:py-16 px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <h3 className="subhead-text text-center">{portfolioData.sections.workExperience.heading}</h3>
            <p className="text-gray-600 mt-3 text-center max-w-2xl text-sm sm:text-base px-4">
              {portfolioData.sections.workExperience.description}
            </p>
          </div>

          <div className="mt-8 md:mt-12 space-y-6 md:space-y-8 relative">
            {/* Mobile Vertical Timeline Line */}
            <div className="hidden sm:block md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-transparent opacity-40" />
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.company_name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start px-2">
                  {/* Icon Section - Centered on mobile */}
                  <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start relative z-10">
                    {/* Mobile connecting dot */}
                    <div className="hidden sm:block md:hidden absolute left-1/2 -translate-x-1/2 -bottom-12 w-2 h-2 rounded-full bg-purple-400 z-20" />
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md sm:shadow-lg transition-all duration-300 group-hover:shadow-xl border-2 sm:border-0 border-purple-100"
                        style={{
                          background: `linear-gradient(135deg, ${experience.iconBg} 0%, ${experience.iconBg}dd 100%)`,
                        }}
                      >
                        <img
                          src={experience.icon}
                          alt={experience.company_name}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
                        />
                      </div>
                      {/* Decorative gradient ring */}
                      <div
                        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"
                        style={{
                          background: `linear-gradient(135deg, ${experience.iconBg} 0%, ${experience.iconBg}dd 100%)`,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 w-full bg-white/90 sm:bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg border border-purple-100/50 transition-all duration-300 group-hover:shadow-xl group-hover:border-purple-200">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                      <div
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full animate-pulse flex-shrink-0"
                        style={{ backgroundColor: experience.iconBg }}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-purple-600 bg-purple-50 px-2.5 sm:px-3 py-1 rounded-full">
                        {experience.date}
                      </span>
                    </div>

                    {/* Title and Company */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 sm:mb-1.5 font-poppins leading-tight">
                        {experience.title}
                      </h3>
                      <p className="text-base sm:text-lg font-semibold text-purple-600">
                        {experience.company_name}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2.5 sm:space-y-3 mt-4 sm:mt-6">
                      {experience.points.map((point, pointIndex) => (
                        <motion.li
                          key={`experience-point-${pointIndex}`}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 + pointIndex * 0.04 }}
                          className="flex items-start gap-2.5 sm:gap-3 text-gray-600 leading-relaxed"
                        >
                          <span
                            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 sm:mt-2.5"
                            style={{ backgroundColor: experience.iconBg }}
                          />
                          <span className="text-xs sm:text-sm md:text-base flex-1">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connecting Line - Desktop */}
                {index < experiences.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-24 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-transparent opacity-50" />
                )}
                {/* Mobile connecting line */}
                {index < experiences.length - 1 && (
                  <div className="hidden sm:block md:hidden absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-transparent opacity-40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="py-8 md:py-16 px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <h3 className="subhead-text text-center">{portfolioData.sections.services.heading}</h3>
            <p className="text-gray-600 mt-3 text-center max-w-2xl text-sm sm:text-base px-4">
              {portfolioData.sections.services.description}
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services
              .slice(0, showAllServices || !isMobile ? services.length : 4)
              .map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
          </div>

          {/* Show More Button - Mobile Only */}
          {services.length > 4 && (
            <div className="flex justify-center mt-8 md:hidden">
              <motion.button
                onClick={() => setShowAllServices(!showAllServices)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showAllServices ? 'Show Less' : 'Show More'}</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showAllServices ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            </div>
          )}
        </div>

        <hr className="border-purple-200" />

        <CTA />
      </section>

    </>
  );
};

export default MySkills;
