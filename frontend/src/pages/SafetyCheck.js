import React from "react";
import { motion } from "framer-motion";

const SafetyCheck = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-gray-800"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        Health & Safety Check
      </motion.h1>

      <motion.div 
        className="mt-8 p-6 bg-white rounded-lg shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-lg text-gray-700">Ensure your safety with a quick health check.</p>
      </motion.div>
    </motion.div>
  );
};

export default SafetyCheck;
