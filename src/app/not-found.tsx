"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      {/* Animated 404 Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-8xl font-bold text-gray-900"
      >
        404
      </motion.h1>

      {/* Animated Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mt-4 text-xl text-gray-600"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Go Back Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-all duration-300 hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Decorative Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "backOut", delay: 0.7 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform text-gray-300"
      >
        <svg
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={0.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 21.75h4.5m-4.5-4.5h4.5m-4.5-4.5h4.5m-4.5-4.5h4.5m-4.5-4.5h4.5m6.75 4.5v15m-15-15v15"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
