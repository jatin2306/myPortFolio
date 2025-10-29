import { useState, useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills } from "../constants";

import "react-vertical-timeline-component/style.min.css";
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
        <div className="py-10 flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <h3 className="subhead-text">My Skills</h3>
            <p className="text-slate-600 mt-3 text-center max-w-2xl">
              A comprehensive collection of technologies and tools I've mastered
              throughout my journey as a software developer.
            </p>
          </div>

          {/* Circular Carousel Container */}
          <div className="mt-8 sm:mt-16 relative px-4 sm:px-0">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 z-20 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border border-gray-200 hover:border-blue-300 group touch-manipulation"
              aria-label="Previous skills"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 z-20 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border border-gray-200 hover:border-blue-300 group touch-manipulation"
              aria-label="Next skills"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
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

            {/* Carousel Track */}
            <div className="overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div
                ref={carouselRef}
                className="flex transition-transform ease-in-out"
                style={{
                  transitionDuration: "600ms",
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                  const slideSkills = skills.slice(
                    slideIndex * skillsPerView,
                    slideIndex * skillsPerView + skillsPerView
                  );
                  return (
                    <div
                      key={slideIndex}
                      className="flex gap-2 sm:gap-4 md:gap-6 justify-center min-w-full flex-shrink-0"
                    >
                      {slideSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`flex-shrink-0 ${
                            skillsPerView === 2
                              ? "w-[calc(50%-4px)] sm:w-[calc(50%-6px)] min-w-[110px] sm:min-w-[130px]"
                              : skillsPerView === 3
                              ? "w-[calc(33.333%-5.33px)] sm:w-[calc(33.333%-8px)] min-w-[100px] sm:min-w-[130px]"
                              : "w-[calc(20%-15.36px)] min-w-[120px] sm:min-w-[140px] max-w-[180px]"
                          }`}
                        >
                          <div className="relative group block-container w-full aspect-square cursor-pointer">
                            <span
                              className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2
                                   bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 
                                   rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                   transition-all duration-300 pointer-events-none z-50
                                   whitespace-nowrap shadow-xl transform group-hover:-translate-y-1
                                   border border-blue-500/30"
                            >
                              {skill.name}
                              {/* Tooltip arrow */}
                              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600"></span>
                            </span>

                            {/* Skill Card */}
                            <div className="btn-back-blue rounded-xl" />
                            <div className="btn-front rounded-xl flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4">
                              <img
                                src={skill.imageUrl}
                                alt={skill.name}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
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
                      ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] w-6 sm:w-8 h-1.5"
                      : "bg-gray-300 w-1.5 h-1.5 hover:bg-gray-400 active:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="py-16">
          <h3 className="subhead-text">Work Experience.</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I’ve worked with different companies where I learned, improved my
              skills, and collaborated with great teams. Here’s an overview of
              my journey:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  iconStyle={{ background: experience.iconBg }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                >
                  <div>
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 font-medium text-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={`experience-point-${index}`}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </>
  );
};

export default MySkills;
