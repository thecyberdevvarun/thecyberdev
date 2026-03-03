"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/slices/themeSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Shield,
  CheckCircle,
  Loader2,
  Sparkles,
  LogIn,
  ArrowLeft,
} from "lucide-react";
import {
  AuthLayout,
  InputField,
  SocialButton,
  validateField,
} from "../../../components/Auth";

export default function Login() {
  const darkMode = useSelector(selectDarkMode);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ["email", "password"];
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      console.log("Login submitted:", formData);
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

      <div className="w-full max-w-md relative z-10">
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
                <LogIn className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h1
                className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                Welcome Back
              </h1>
              <p
                className={`text-sm sm:text-base ${
                  darkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                Sign in to continue your security journey
              </p>
            </motion.div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <SocialButton
              icon={<Chrome className="w-5 h-5" />}
              label="Continue with Google"
              darkMode={darkMode}
            />
            <SocialButton
              icon={<Github className="w-5 h-5" />}
              label="Continue with GitHub"
              darkMode={darkMode}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div
              className={`absolute inset-0 flex items-center ${
                darkMode ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              <div className="w-full border-t border-current" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  darkMode
                    ? "bg-neutral-900 text-neutral-400"
                    : "bg-white text-neutral-500"
                }`}
              >
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 transition-all peer-checked:bg-indigo-500 peer-checked:border-indigo-500 ${
                      darkMode
                        ? "border-neutral-600 bg-neutral-800"
                        : "border-neutral-300 bg-white"
                    }`}
                  />
                  <CheckCircle
                    className={`absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 text-white transition-opacity ${
                      rememberMe ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className={`text-xs sm:text-sm font-medium transition ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Forgot password?
              </Link>
            </div>

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
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch to Signup */}
          <div className="mt-6 sm:mt-8 text-center">
            <p
              className={`text-sm ${
                darkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className={`font-semibold transition ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Sign up
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
