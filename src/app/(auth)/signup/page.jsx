"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/slices/themeSlice";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Github,
  Chrome,
  Shield,
  Loader2,
  Sparkles,
  KeyRound,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import {
  AuthLayout,
  InputField,
  SocialButton,
  validateField,
  getPasswordStrength,
  strengthLabels,
  strengthColors,
} from "../../../components/Auth";

export default function Signup() {
  const darkMode = useSelector(selectDarkMode);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, formData),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = ["name", "email", "password", "confirmPassword"];
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      console.log("Signup submitted:", formData);
      // router.push("/dashboard")
    }
  };

  return (
    <AuthLayout>
      {/* ── Back to Home ── */}
      <Link
        href="/"
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all z-20 ${
          darkMode
            ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* ── Background Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? "bg-indigo-500/10" : "bg-indigo-500/20"
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? "bg-purple-500/10" : "bg-purple-500/20"
          }`}
        />
      </div>

      <div className="w-full max-w-md relative z-10 py-8">
        {/* ── Mobile Logo ── */}
        <div className="lg:hidden text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span
              className={`text-xl sm:text-2xl font-bold ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              the<span className="text-indigo-500">cyber</span>dev
            </span>
          </Link>
        </div>

        {/* ── Auth Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-xl ${
            darkMode
              ? "bg-neutral-900/80 backdrop-blur-xl border-neutral-800 shadow-black/20"
              : "bg-white border-neutral-200 shadow-neutral-200/50"
          }`}
        >
          {/* Card Header */}
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
                <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h1
                className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                Create Account
              </h1>
              <p
                className={`text-sm sm:text-base ${
                  darkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                Start your journey to secure coding
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name */}
            <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={<User className="w-5 h-5" />}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              darkMode={darkMode}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              darkMode={darkMode}
            />

            {/* Password + Strength */}
            <div>
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                value={formData.password}
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

              {/* Password Strength */}
              <AnimatePresence>
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2"
                  >
                    {/* Strength Bars */}
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : darkMode
                                ? "bg-neutral-700"
                                : "bg-neutral-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Strength Label */}
                    <p
                      className={`text-xs ${
                        darkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
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

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<KeyRound className="w-5 h-5" />}
              value={formData.confirmPassword}
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

            {/* Terms */}
            <p
              className={`text-xs sm:text-sm ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className={`font-medium underline ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className={`font-medium underline ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Privacy Policy
              </Link>
            </p>

            {/* Submit */}
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
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 sm:mt-8 text-center">
            <p
              className={`text-sm ${
                darkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className={`font-semibold transition ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* ── Beta Badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm ${
              darkMode
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>First 500 users get lifetime Pro access!</span>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
