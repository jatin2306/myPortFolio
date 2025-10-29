import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { CTA } from "../components";
import { experiences, skills } from "../constants";

import About from "./About";

const MySkills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Skills to display in carousel (responsive)
  const [skillsPerView, setSkillsPerView] = useState(5);
  const totalSlides = Math.ceil(skills.length / skillsPerView);

  // Responsive skills per view
  useEffect(() => {
    const updateSkillsPerView = () => {
      if (window.innerWidth < 640) {
        setSkillsPerView(2); // Mobile: 2 skills
      } else if (window.innerWidth < 1024) {
        setSkillsPerView(3); // Tablet: 3 skills
      } else {
        setSkillsPerView(5); // Desktop: 5 skills
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


  return (
    <>
      <About />
      <section className="max-container">
        <div className="py-6 sm:py-10 flex flex-col">
          <div className="flex flex-col items-center mb-6 sm:mb-8 px-2">
            <h3 className="subhead-text text-center">My Skills</h3>
            <p className="text-gray-600 mt-3 text-center max-w-2xl px-2 text-sm sm:text-base">
              A comprehensive collection of technologies and tools I've mastered
              throughout my journey as a software developer.
            </p>
          </div>

          {/* Circular Carousel Container */}
          <div className="mt-6 sm:mt-16 relative px-2 sm:px-0">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 z-20 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border border-purple-200 hover:border-purple-300 group touch-manipulation"
              aria-label="Previous skills"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 z-20 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border border-purple-200 hover:border-purple-300 group touch-manipulation"
              aria-label="Next skills"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="overflow-hidden px-2 sm:px-6 md:px-8 lg:px-12">
              <div
                ref={carouselRef}
                className="flex transition-transform ease-in-out"
                style={{
                  transitionDuration: "600ms",
                  transform: `translateX(-${currentIndex * 100}%)`,
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
                      className="flex gap-2 sm:gap-4 md:gap-6 justify-center items-center min-w-full flex-shrink-0 pb-16 px-2 sm:px-4"
                    >
                      {slideSkills.map((skill, skillIndex) => (
                        <div
                          key={`${slideIndex}-${skillIndex}-${skill.name}`}
                          className="flex-shrink-0 flex-1 min-w-[110px] sm:min-w-[130px] max-w-[180px]"
                        >
                            <div className="relative group block-container w-full aspect-square cursor-pointer">
                            <span
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                   bg-gradient-to-r from-[#c4b5fd] to-[#9333ea] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 
                                   rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                   transition-all duration-300 pointer-events-none z-[999]
                                   whitespace-nowrap shadow-xl transform group-hover:translate-y-0
                                   border border-purple-500/30"
                            >
                              {skill.name}
                              {/* Tooltip arrow */}
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#9333ea]"></span>
                            </span>

                            {/* Skill Card */}
                            <div className="btn-back-blue rounded-xl" />
                            <div className="btn-front rounded-xl flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4">
                              <img
                                src={skill.imageUrl}
                                alt={skill.name}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.opacity = '0';
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 px-4">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full touch-manipulation ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#c4b5fd] to-[#9333ea] w-6 sm:w-8 h-1.5"
                      : "bg-purple-200 w-1.5 h-1.5 hover:bg-purple-300 active:bg-purple-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="py-8 md:py-16 px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <h3 className="subhead-text text-center">Work Experience</h3>
            <p className="text-gray-600 mt-3 text-center max-w-2xl text-sm sm:text-base px-4">
              I've worked with different companies where I learned, improved my
              skills, and collaborated with great teams. Here's an overview of
              my journey:
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

        <hr className="border-purple-200" />

        <CTA />
      </section>
    </>
  );
};

export default MySkills;
