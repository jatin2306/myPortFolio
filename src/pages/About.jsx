import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import { motion, useInView, useAnimation } from "framer-motion";
import { portfolioData, socialLinks, projects, experiences } from "../constants";

const About = () => {
  const { personal } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  
  // Intersection Observer hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  
  // Animation controls
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const skillsControls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (statsInView) {
      setCountersVisible(true);
      statsControls.start("visible");
    }
  }, [statsInView, statsControls]);

  useEffect(() => {
    if (skillsInView) {
      skillsControls.start("visible");
    }
  }, [skillsInView, skillsControls]);

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
      if (countersVisible && countRef.current) {
        let startTime = null;
        const startValue = 0;
        const endValue = parseInt(end) || 0;

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
          
          setCount(current);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(endValue);
          }
        };
        
        requestAnimationFrame(animate);
      }
    }, [countersVisible, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  // Calculate stats
  const stats = [
    { label: "Years Experience", value: "3", suffix: "+", icon: "💼", isNumber: true },
    { label: "Projects Completed", value: projects.length.toString(), icon: "🚀", isNumber: true },
    { label: "Companies Worked", value: experiences.length.toString(), icon: "🏢", isNumber: true },
    { label: "Location", value: personal.location, icon: personal.locationEmoji || "🌍", isNumber: false },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24"
    >
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
        {/* Left Side - Content */}
        <div className={`space-y-6 text-center lg:text-left ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Badge */}
   

          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-gray-600">{personal.greeting}</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {personal.name}
            </span>
          </h1>

          {/* Typing Effect */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            <span className="text-gray-700">I am a </span>
            <ReactTypingEffect
              text={personal.typingTexts}
              speed={100}
              className="text-purple-600"
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-purple-600">{cursor}</span>
              )}
            />
          </div>

          {/* About Me */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {personal.aboutMe}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <a
              href={personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Download CV
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </a>
            <Link
              to="/projects"
              className="group px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                View Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
            <span className="text-sm font-medium text-gray-600">Connect:</span>
            <div className="flex gap-3">
              {socialLinks
                .filter(link => link.name !== "Contact" && link.name !== "Phone")
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.link}
                    target={link.link.startsWith('http') ? "_blank" : undefined}
                    rel={link.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="group relative p-3 bg-white rounded-xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <img
                      src={link.iconUrl}
                      alt={link.name}
                      className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Gradient Background Circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Profile Image Container */}
            <Tilt
              className="relative z-10"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope={true}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Outer Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-white"></div>
                </div>
                
                {/* Image Container */}
                <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-full shadow-xl border border-purple-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Available for work</span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Preview Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 sm:p-12 border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            What I Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Specializing in building modern, scalable web applications with cutting-edge technologies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Frontend Development */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Development</h3>
            <p className="text-gray-600 leading-relaxed">
              Creating beautiful, responsive user interfaces with React, Next.js, and modern CSS frameworks
            </p>
          </div>

          {/* Backend Development */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Backend Development</h3>
            <p className="text-gray-600 leading-relaxed">
              Building robust APIs and server-side solutions with Node.js, Express, and databases
            </p>
          </div>

          {/* Performance Optimization */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Optimization</h3>
            <p className="text-gray-600 leading-relaxed">
              Optimizing applications for speed, reducing load times, and improving user experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
