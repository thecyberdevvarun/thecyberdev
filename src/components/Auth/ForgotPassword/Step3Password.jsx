"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  InputField,
  validateField,
  strengthLabels,
  strengthColors,
} from "../Auth";

export default function Step3Password({
  darkMode,
  passwords,
  setPasswords,
  errors,
  setErrors,
  touched,
  setTouched,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  isLoading,
  onSubmit,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, { ...passwords, [name]: value }),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, passwords),
    }));
  };

  const requirements = [
    { check: passwords.password.length >= 8, text: "At least 8 characters" },
    { check: /[A-Z]/.test(passwords.password), text: "One uppercase letter" },
    { check: /[a-z]/.test(passwords.password), text: "One lowercase letter" },
    { check: /[0-9]/.test(passwords.password), text: "One number" },
    {
      check: /[^A-Za-z0-9]/.test(passwords.password),
      text: "One special character",
    },
  ];

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
                ? "bg-purple-500/20 text-purple-400"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Set New Password
          </h1>
          <p
            className={`text-sm sm:text-base ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Create a strong password for your account
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <InputField
            label="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5" />}
            value={passwords.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            darkMode={darkMode}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`p-1 rounded-lg transition cursor-pointer ${
                  darkMode
                    ? "hover:bg-neutral-700 text-neutral-400"
                    : "hover:bg-neutral-100 text-neutral-500"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            }
          />

          {/* Password Strength Indicator */}
          <AnimatePresence>
            {passwords.password && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2"
              >
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i < passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : darkMode
                            ? "bg-neutral-700"
                            : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className={`text-xs ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Password strength:{" "}
                  <span
                    className={`font-medium ${
                      passwordStrength >= 4
                        ? "text-emerald-500"
                        : passwordStrength >= 3
                          ? "text-lime-500"
                          : passwordStrength >= 2
                            ? "text-yellow-500"
                            : "text-red-500"
                    }`}
                  >
                    {strengthLabels[passwordStrength - 1] || "Too weak"}
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<KeyRound className="w-5 h-5" />}
          value={passwords.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
          darkMode={darkMode}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`p-1 rounded-lg transition cursor-pointer ${
                darkMode
                  ? "hover:bg-neutral-700 text-neutral-400"
                  : "hover:bg-neutral-100 text-neutral-500"
              }`}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          }
        />

        {/* Password Requirements */}
        <div
          className={`p-4 rounded-xl ${
            darkMode ? "bg-neutral-800/50" : "bg-neutral-50"
          }`}
        >
          <p
            className={`text-sm font-medium mb-2 ${
              darkMode ? "text-neutral-300" : "text-neutral-700"
            }`}
          >
            Password must contain:
          </p>
          <ul className="space-y-1.5">
            {requirements.map((req, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  req.check
                    ? "text-emerald-500"
                    : darkMode
                      ? "text-neutral-500"
                      : "text-neutral-400"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 shrink-0 transition-opacity ${
                    req.check ? "opacity-100" : "opacity-30"
                  }`}
                />
                {req.text}
              </li>
            ))}
          </ul>
        </div>

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
              <span>Resetting password...</span>
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
