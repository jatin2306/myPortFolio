import { useState, useEffect } from "react";
import { CTA } from "../components";
import { projects, portfolioData } from "../constants";
import { arrow, github } from "../assets/icons";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const { sections } = portfolioData;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initialize image indices for each project
  useEffect(() => {
    const indices = {};
    projects.forEach((project) => {
      indices[project.id] = 0;
    });
    setCurrentImageIndex(indices);
  }, []);

  // Get images for a project (support both single image and array)
  const getProjectImages = (project) => {
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    return [project.imageUrl];
  };

  // Navigate carousel
  const goToImage = (projectId, direction) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const images = getProjectImages(project);
    setCurrentImageIndex((prev) => {
      const current = prev[projectId] || 0;
      let next = current;

      if (direction === "next") {
        next = (current + 1) % images.length;
      } else if (direction === "prev") {
        next = (current - 1 + images.length) % images.length;
      } else {
        next = direction; // direct index
      }

      return { ...prev, [projectId]: next };
    });
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-24'>
      {/* Compact Heading */}
      <div className='mb-8 lg:mb-12'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* Main Heading - Compact */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight'>
            <span className='text-gray-900'>
              {sections.projects.heading.split(' ').slice(0, -1).join(' ')}{" "}
            </span>
            <span className='bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient'>
              {sections.projects.heading.split(' ').slice(-1)[0]}
            </span>
          </h1>

          {/* Description - Compact */}
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            {sections.projects.description}
          </p>
        </div>
      </div>

      {/* Modern Grid Layout - 3 columns on large screens, 2 on medium, 1 on mobile */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className='group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 hover:border-purple-200'
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project Image Carousel - Larger */}
            <div className='relative h-72 sm:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-gray-50 to-purple-50 group/image-carousel'>
              {(() => {
                const images = getProjectImages(project);
                const currentIndex = currentImageIndex[project.id] || 0;
                const hasMultipleImages = images.length > 1;

                return (
                  <>
                    {/* Image Container */}
                    <div className='relative w-full h-full'>
                      {images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${project.name} - Image ${idx + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                            idx === currentIndex
                              ? 'opacity-100 scale-100 z-10'
                              : 'opacity-0 scale-105 z-0'
                          } ${
                            hoveredProject === project.id ? 'scale-110' : 'scale-100'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Carousel Navigation Arrows - Show on hover or always on mobile */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(project.id, 'prev');
                          }}
                          className='absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white active:bg-white text-gray-700 p-2.5 md:p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/image-carousel:opacity-100 md:opacity-100 touch-manipulation'
                          aria-label='Previous image'
                        >
                          <svg className='w-5 h-5 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(project.id, 'next');
                          }}
                          className='absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white active:bg-white text-gray-700 p-2.5 md:p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/image-carousel:opacity-100 md:opacity-100 touch-manipulation'
                          aria-label='Next image'
                        >
                          <svg className='w-5 h-5 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Carousel Dots Indicator */}
                    {hasMultipleImages && (
                      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToImage(project.id, idx);
                            }}
                            className={`transition-all duration-300 rounded-full touch-manipulation ${
                              idx === currentIndex
                                ? 'w-8 h-2 bg-white shadow-lg'
                                : 'w-2 h-2 bg-white/50 hover:bg-white/75 active:bg-white/90'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Image Counter */}
                    {hasMultipleImages && (
                      <div className='absolute top-3 left-3 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm'>
                        {currentIndex + 1} / {images.length}
                      </div>
                    )}

                    {/* Subtle Overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Icon Badge - Modern Design */}
                    <div className='absolute top-5 right-5 z-20'>
                      <div className='w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300'>
                        <img
                          src={project.iconUrl}
                          alt={project.name}
                          className='w-6 h-6 lg:w-7 lg:h-7 object-contain'
                        />
                      </div>
                    </div>

                    {/* Action Buttons - Modern Design */}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <div
                        className={`absolute bottom-5 left-5 right-5 transition-all duration-500 z-20 ${
                          hoveredProject === project.id
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Visit Site</span>
                          <img src={arrow} alt='arrow' className='w-4 h-4' />
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Project Content - More Spacious */}
            <div className='p-8 lg:p-10'>
              {/* Project Title */}
              <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300'>
                {project.name}
              </h3>
              
              {/* Description */}
              <p className='text-gray-600 mb-6 leading-relaxed text-base lg:text-lg line-clamp-3'>
                {project.description}
              </p>

              {/* Tech Stack - Cleaner Design */}
              <div className='flex flex-wrap gap-2.5 mb-6'>
                {project.techStack.slice(0, 5).map((tech, idx) => (
                  <div
                    key={idx}
                    className='flex items-center gap-2 px-3.5 py-2 bg-gray-50 hover:bg-purple-50 rounded-lg text-xs lg:text-sm font-medium text-gray-700 hover:text-purple-700 border border-gray-200 hover:border-purple-200 transition-all duration-200'
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className='w-4 h-4 lg:w-5 lg:h-5 object-contain'
                    />
                    <span>{tech.name}</span>
                  </div>
                ))}
                {project.techStack.length > 5 && (
                  <div className='flex items-center px-3.5 py-2 bg-gray-100 rounded-lg text-xs lg:text-sm font-medium text-gray-600'>
                    +{project.techStack.length - 5}
                  </div>
                )}
              </div>

              {/* Action Links - Modern Design */}
              <div className='flex items-center gap-4 pt-6 border-t border-gray-100'>
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm lg:text-base transition-all duration-200 group/link'
                  >
                    <span>View Live</span>
                    <img src={arrow} alt='arrow' className='w-4 h-4 group-hover/link:translate-x-1 transition-transform' />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-sm lg:text-base transition-all duration-200 ml-auto group/link'
                  >
                    <img src={github} alt='github' className='w-5 h-5 group-hover/link:scale-110 transition-transform' />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className='mt-20 lg:mt-32'>
        <CTA />
      </div>
    </section>
  );
};

export default Projects;
