import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FaArrowLeft } from 'react-icons/fa';
import { FaLaughBeam } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-100" style={{margin:50}}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md w-full"
      >
        
        {/* Icon */}
        {/* <FaLaughBeam color="red"/> */}
        <motion.div
        
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="text-green-500" size={80} />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-green-600">
          🎉 Payment Successful!
        </h1>

        {/* Message */}
        <p className="mt-4 text-lg text-gray-700">
          Thank you for your order. Your payment has been received successfully.
        </p>

        {/* Button */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 btn btn-warnint inline-block px-6 py-3 text-dark font-medium rounded-full shadow-md hover:bg-green-700 transition"
        >
         <FaArrowLeft/> Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Success;
