import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import { profileImage } from "../assets/icons";

const About = () => {
  return (
    <section
      id="about"
      className="py-4 px-4 sm:px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-20 lg:mt-20 lg:pt-16"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center lg:gap-5">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2 leading-tight">
            Hi, I am
          </h1>
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
            Jatin Gupta
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-purple-600 leading-tight">
            <span className="text-black">I am a </span>
            <ReactTypingEffect
              text={[
                "Software Developer",
                "Software Engineer",
                "Web Developer",
                "Coder",
              ]}
              speed={100}
              className="text-purple-600"
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-purple-600">{cursor}</span>
              )}
            />
          </h3>
          {/* About Me Paragraph */}
          <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            Software Engineer specializing in frontend development with 3+ years
            of experience. Built banking-grade applications, reusable UI
            libraries, and performance-optimized dashboards using React.js,
            Next.js, and Tailwind CSS. Known for reducing load times by up to
            80%, improving application stability, and delivering critical
            features ahead of deadlines.
          </p>
          {/* Resume Button */}
          <a
            href="https://lively-lollipop-3d1f89.netlify.app/Jatin_Gupta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Download CV
          </a>
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center lg:justify-end">
          <Tilt
            className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full border-4 border-purple-400"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="Jatin Gupta"
                className="w-full h-full object-cover"
              />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
