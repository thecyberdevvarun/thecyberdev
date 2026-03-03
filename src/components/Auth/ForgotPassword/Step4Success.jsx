"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Step4Success({ darkMode, onLogin }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-6 relative"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
        className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-6 ${
          darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.4, delay: 0.3 }}
        >
          <ShieldCheck
            className={`w-10 h-10 sm:w-12 sm:h-12 ${
              darkMode ? "text-emerald-400" : "text-emerald-600"
            }`}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-neutral-900"
          }`}
        >
          Password Reset!
        </h1>
        <p
          className={`text-sm sm:text-base mb-8 ${
            darkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Your password has been successfully reset.
          <br />
          You can now sign in with your new password.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={onLogin}
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/25 text-white transition-all cursor-pointer"
        >
          <span>Continue to Sign In</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: -20,
              x: Math.random() * 400 - 200,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 300],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 2,
              delay: 0.2 + i * 0.1,
              ease: "easeOut",
            }}
            className={`absolute top-0 left-1/2 w-3 h-3 rounded-sm ${
              [
                "bg-indigo-500",
                "bg-purple-500",
                "bg-emerald-500",
                "bg-yellow-500",
                "bg-pink-500",
              ][i % 5]
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
