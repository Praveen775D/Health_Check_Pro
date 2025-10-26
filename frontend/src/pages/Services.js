import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="h-screen w-full overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Header Section */}
      <header className="bg-blue-600 dark:bg-blue-800 p-4 md:p-6 text-center text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Our Services</h1>
        <p className="mt-1 md:mt-2 text-sm md:text-lg">
          Explore our health-related services for better wellness
        </p>
      </header>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-lg md:text-2xl font-bold">{service.icon} {service.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1 md:mt-2 text-sm md:text-base">
              {service.description}
            </p>
            <Link to={service.link}>
              <button
                className={`mt-3 md:mt-4 px-4 md:px-6 py-2 text-white rounded-lg hover:brightness-110 transition ${service.buttonColor}`}
              >
                {service.buttonText}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Services content data
const servicesData = [
  {
    icon: "🤒",
    title: "Symptoms Check",
    description: "Enter your symptoms and get health-related insights.",
    link: "/symptoms-check",
    buttonText: "Check Symptoms",
    buttonColor: "bg-blue-500 hover:bg-blue-700"
  },
  {
    icon: "🤖",
    title: "AI Chatbot",
    description: "Chat with our AI assistant to get instant health advice.",
    link: "/chatbot",
    buttonText: "Chat Now",
    buttonColor: "bg-green-500 hover:bg-green-700"
  },
  {
    icon: "🏥",
    title: "Doctor Consultation",
    description: "Book virtual consultations with certified doctors.",
    link: "/doctor-consultation",
    buttonText: "Book Appointment",
    buttonColor: "bg-red-500 hover:bg-red-700"
  },
  {
    icon: "📅",
    title: "Health Reminders",
    description: "Set reminders for medication, exercise, and checkups.",
    link: "/health-reminders",
    buttonText: "Set Reminders",
    buttonColor: "bg-yellow-500 hover:bg-yellow-700"
  },
  {
    icon: "📊",
    title: "Health Reports",
    description: "View and download personalized health reports.",
    link: "/health-reports",
    buttonText: "View Reports",
    buttonColor: "bg-purple-500 hover:bg-purple-700"
  },
  {
    icon: "👁️",
    title: "Eye Test Services",
    description: "Check your vision with our eye test services.",
    link: "/eye-test",
    buttonText: "Take Eye Test",
    buttonColor: "bg-indigo-500 hover:bg-indigo-700"
  }
];

export default Services;
