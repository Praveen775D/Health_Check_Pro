import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-400 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate__animated animate__fadeIn">Contact Us</h2>
        
        <p className="text-xl text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          We’d love to hear from you. Reach out to us using the contact details below.
        </p>

        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-2s">
          {/* Phone Number */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5l2-2 2 2-2 2-2-2zm0 0l-2 2 2 2 2-2-2-2zm4 10l2 2 2-2-2-2-2 2z" />
              </svg>
            </span>
            <span className="text-xl text-gray-800">Phone No: +91 772489450323</span>
          </div>
          
          {/* Email */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5l2-2 2 2-2 2-2-2zm0 0l-2 2 2 2 2-2-2-2zm4 10l2 2 2-2-2-2-2 2z" />
              </svg>
            </span>
            <span className="text-xl text-gray-800">Email: HealthCheckPro@gmail.com</span>
          </div>
          
          {/* Landline */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5l2-2 2 2-2 2-2-2zm0 0l-2 2 2 2 2-2-2-2zm4 10l2 2 2-2-2-2-2 2z" />
              </svg>
            </span>
            <span className="text-xl text-gray-800">Land Line: +040-1234568</span>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5l2-2 2 2-2 2-2-2zm0 0l-2 2 2 2 2-2-2-2zm4 10l2 2 2-2-2-2-2 2z" />
              </svg>
            </span>
            <span className="text-xl text-gray-800">Address: xxxxxx, India</span>
          </div>
        </div>

        <div className="mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
