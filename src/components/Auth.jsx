"use client";

import { useSelector } from "react-redux";
import { selectDarkMode } from "../redux/slices/themeSlice";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

// ─────────────────────────────────────────
// Validation
// ─────────────────────────────────────────
export function validateField(name, value) {
  switch (name) {
    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email";
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      return "";

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      return "";

    case "name":
      if (!value) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return "";

    default:
      return "";
  }
}

// ─────────────────────────────────────────
// AuthLayout
// ─────────────────────────────────────────
export function AuthLayout({ children }) {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        darkMode ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      {/* ── Left Panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600" />

        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-32 w-100 h-100 bg-white/10 rounded-full blur-[80px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 -right-32 w-100 h-100 bg-white/10 rounded-full blur-[80px]"
          />
          {/* Dot Grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Panel Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              the<span className="text-white/70">cyber</span>dev
            </span>
          </Link>

          {/* Middle Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                Think Like a <span className="text-white/70">Hacker.</span>
                <br />
                Code Like a <span className="text-white/70">Pro.</span>
              </h2>
              <p className="text-white/70 text-lg max-w-md leading-relaxed">
                Master cybersecurity through gamified coding challenges. Fix
                real vulnerabilities, earn XP, and build bulletproof code.
              </p>
            </motion.div>

            {/* Feature Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 space-y-4"
            >
              {[
                "500+ real security challenges",
                "OWASP Top 10 coverage",
                "Gamified XP & leaderboards",
                "Monaco editor — VS Code in browser",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[
                "from-indigo-400 to-purple-500",
                "from-emerald-400 to-teal-500",
                "from-amber-400 to-orange-500",
                "from-red-400 to-pink-500",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full bg-linear-to-br ${gradient} border-2 border-white/20`}
                />
              ))}
            </div>
            <div className="text-white/70 text-sm">
              <span className="text-white font-bold">10,847+</span> developers
              already learning
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel (form area) ── */}
      <div
        className={`flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative ${
          darkMode ? "bg-neutral-950" : "bg-neutral-50"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// InputField
// ─────────────────────────────────────────
export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  error,
  darkMode,
  rightElement,
}) {
  const hasError = !!error;

  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium mb-1.5 ${
          darkMode ? "text-neutral-300" : "text-neutral-700"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              hasError
                ? "text-red-400"
                : darkMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full py-3.5 rounded-xl transition-all focus:outline-none focus:ring-2 text-sm ${
            icon ? "pl-11" : "pl-4"
          } ${rightElement ? "pr-12" : "pr-4"} ${
            hasError
              ? darkMode
                ? "bg-red-500/10 border border-red-500/50 text-white placeholder-neutral-500 focus:ring-red-500/30"
                : "bg-red-50 border border-red-300 text-neutral-900 placeholder-neutral-400 focus:ring-red-300"
              : darkMode
                ? "bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:ring-indigo-500/40 focus:border-indigo-500/50"
                : "bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-indigo-500/30 focus:border-indigo-400"
          }`}
        />

        {/* Right Element */}
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 mt-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <p className="text-xs text-red-500">{error}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// SocialButton
// ─────────────────────────────────────────
export function SocialButton({ icon, label, darkMode, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
        darkMode
          ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-neutral-600"
          : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300"
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

// ─────────────────────────────────────────
// Password Strength Utilities
// ─────────────────────────────────────────
export function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export const strengthLabels = [
  "Very Weak",
  "Weak",
  "Fair",
  "Strong",
  "Very Strong",
];

export const strengthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-emerald-500",
];
