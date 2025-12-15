import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import useAlert from "../hooks/useAlert";
import { Alert } from "../components";
import { portfolioData } from "../constants";

const Contact = () => {
  const { contact: contactData } = portfolioData;
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: contactData.toName,
          from_email: form.email,
          to_email: contactData.toEmail,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: contactData.messages.success,
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: contactData.messages.error,
            type: "danger",
          });
        }
      );
  };

  return (
    <section id="contact" className='relative w-full min-h-screen pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
      {alert.show && <Alert {...alert} />}

      <div className="max-w-7xl mx-auto w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] -z-10" />

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 lg:items-start">
          {/* Form Section */}
          <motion.div 
            className='flex-1 w-full lg:max-w-2xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 sm:mb-8 md:mb-10">
              <motion.h1 
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {contactData.heading}
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Let's work together to bring your ideas to life. I'm always open to discussing new projects and opportunities.
              </motion.p>
            </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
              className='w-full flex flex-col gap-4 sm:gap-5 md:gap-6'
            >
              {/* Name Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className='block text-gray-700 font-semibold mb-2 text-sm sm:text-base'>
            {contactData.formLabels.name}
                </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-500 z-10 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
            <input
              type='text'
              name='name'
                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-xl outline-none ${
                      focusedField === 'name' 
                        ? 'border-purple-500 ring-2 ring-purple-300' 
                        : 'border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300'
                    }`}
              placeholder={contactData.formPlaceholders.name}
              required
              value={form.name}
              onChange={handleChange}
                    onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
            />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className='block text-gray-700 font-semibold mb-2 text-sm sm:text-base'>
                  {contactData.formLabels.email}
          </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-500 z-10 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
            <input
              type='email'
              name='email'
                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-xl outline-none ${
                      focusedField === 'email' 
                        ? 'border-purple-500 ring-2 ring-purple-300' 
                        : 'border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300'
                    }`}
              placeholder={contactData.formPlaceholders.email}
              required
              value={form.email}
              onChange={handleChange}
                    onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
            />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className='block text-gray-700 font-semibold mb-2 text-sm sm:text-base'>
                  {contactData.formLabels.message}
          </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-purple-500 z-10 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
            <textarea
              name='message'
                    rows='5'
                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-xl outline-none resize-none ${
                      focusedField === 'message' 
                        ? 'border-purple-500 ring-2 ring-purple-300' 
                        : 'border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300'
                    }`}
              placeholder={contactData.formPlaceholders.message}
              value={form.message}
              onChange={handleChange}
                    onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
                    required
            />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
            type='submit'
                className='relative mt-2 sm:mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {contactData.submitButton.loading}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {contactData.submitButton.default}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Visual Section */}
          <motion.div 
            className='w-full lg:w-1/2 lg:max-w-md xl:max-w-lg relative mt-6 sm:mt-8 lg:mt-0'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 p-6 sm:p-8 flex flex-col items-center justify-center">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Main Icon/Illustration */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>

                <div className="text-center space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Let's Connect!
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xs px-2">
                    I'm excited to hear from you. Drop me a message and I'll get back to you as soon as possible.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="w-full space-y-3 sm:space-y-4 mt-4 sm:mt-6 md:mt-8">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-purple-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">jatingupta2306@gmail.com</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-purple-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">India 🇮🇳</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
