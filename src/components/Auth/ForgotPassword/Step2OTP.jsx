"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, Loader2, RefreshCw } from "lucide-react";

export default function Step2OTP({
  darkMode,
  email,
  otp,
  errors,
  isLoading,
  resendTimer,
  onOtpChange,
  onOtpKeyDown,
  onSubmit,
  onResend,
  onBack,
}) {
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
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >
            <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Check Your Email
          </h1>
          <p
            className={`text-sm sm:text-base ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
          >
            We sent a 6-digit code to
          </p>
          <p
            className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-neutral-900"}`}
          >
            {email}
          </p>
        </motion.div>
      </div>

      {/* OTP Form */}
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label
            className={`block text-sm font-medium mb-3 text-center ${
              darkMode ? "text-neutral-300" : "text-neutral-700"
            }`}
          >
            Enter verification code
          </label>
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) =>
                  onOtpChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => onOtpKeyDown(index, e)}
                className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border-2 transition-all outline-none ${
                  errors.otp
                    ? darkMode
                      ? "border-red-500/50 bg-red-500/10 text-white"
                      : "border-red-300 bg-red-50 text-neutral-900"
                    : darkMode
                      ? "border-neutral-700 bg-neutral-800 text-white focus:border-indigo-500 focus:bg-neutral-700"
                      : "border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-indigo-500 focus:bg-white"
                }`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.otp}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
            isLoading || otp.join("").length !== 6
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/25"
          } text-white`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify Code</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      {/* Resend Code */}
      <div className="mt-6 sm:mt-8 text-center">
        <p
          className={`text-sm ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
        >
          Didn&apos;t receive the code?{" "}
          {resendTimer > 0 ? (
            <span
              className={darkMode ? "text-neutral-500" : "text-neutral-400"}
            >
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={isLoading}
              className={`font-semibold inline-flex items-center gap-1 transition cursor-pointer ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              Resend Code
            </button>
          )}
        </p>
      </div>

      {/* Change Email */}
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-1.5 text-sm font-medium transition cursor-pointer ${
            darkMode
              ? "text-neutral-400 hover:text-white"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Change email address
        </button>
      </div>
    </motion.div>
  );
}
