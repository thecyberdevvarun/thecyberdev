"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, KeyRound, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { InputField, validateField } from "../Auth";

export default function Step1Email({
  darkMode,
  email,
  setEmail,
  errors,
  setErrors,
  touched,
  setTouched,
  isLoading,
  onSubmit,
}) {
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) {
      setErrors({ email: validateField("email", e.target.value) });
    }
  };

  const handleBlur = () => {
    setTouched({ email: true });
    setErrors({ email: validateField("email", email) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-4 ${
              darkMode
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-indigo-100 text-indigo-600"
            }`}
          >
            <KeyRound className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Forgot Password?
          </h1>
          <p
            className={`text-sm sm:text-base ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            No worries! Enter your email and we&apos;ll send you a reset code.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          darkMode={darkMode}
        />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/25"
          } text-white`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending code...</span>
            </>
          ) : (
            <>
              <span>Send Reset Code</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 sm:mt-8 text-center">
        <p
          className={`text-sm ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
        >
          Remember your password?{" "}
          <Link
            href="/login"
            className={`font-semibold transition inline-flex items-center gap-1 ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            <ArrowLeft className="w-3 h-3" />
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
