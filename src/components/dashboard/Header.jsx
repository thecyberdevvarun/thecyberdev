"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../../redux/features/theme/themeSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Flame,
  Trophy,
  Clock,
  Crown,
} from "lucide-react";

export default function Header({ onMenuClick, sidebarCollapsed }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const darkMode = useSelector(selectDarkMode);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "JD",
    level: 12,
    xp: 2450,
    streak: 7,
    isPro: true,
  };

  const notifications = [
    {
      id: 1,
      type: "achievement",
      title: "New Badge Unlocked!",
      message: "You earned the 'XSS Slayer' badge",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "streak",
      title: "7 Day Streak! 🔥",
      message: "Keep it going! You're on fire!",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "challenge",
      title: "New Challenge Available",
      message: "JWT Token Exploitation is now live",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "leaderboard",
      title: "Rank Up!",
      message: "You moved up to #234 on the leaderboard",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
          sidebarCollapsed ? "lg:left-20" : "lg:left-72"
        } left-0`}
      >
        <div
          className={`h-16 lg:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 backdrop-blur-xl border-b ${
            darkMode
              ? "bg-neutral-950/80 border-neutral-800"
              : "bg-white/80 border-neutral-200"
          }`}
        >
          {/* ── Left Section ── */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
              }`}
            >
              <Menu
                className={`w-6 h-6 ${
                  darkMode ? "text-neutral-300" : "text-neutral-700"
                }`}
              />
            </button>

            {/* Desktop Search Bar */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all w-64 lg:w-80 cursor-pointer ${
                darkMode
                  ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  : "bg-neutral-100 border-neutral-200 text-neutral-500 hover:border-neutral-300"
              }`}
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-sm">Search challenges...</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd
                  className={`px-1.5 py-0.5 text-xs rounded ${
                    darkMode ? "bg-neutral-800" : "bg-neutral-200"
                  }`}
                >
                  ⌘
                </kbd>
                <kbd
                  className={`px-1.5 py-0.5 text-xs rounded ${
                    darkMode ? "bg-neutral-800" : "bg-neutral-200"
                  }`}
                >
                  K
                </kbd>
              </div>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`sm:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
              }`}
            >
              <Search
                className={`w-5 h-5 ${
                  darkMode ? "text-neutral-300" : "text-neutral-700"
                }`}
              />
            </button>
          </div>

          {/* ── Right Section ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak */}
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl ${
                darkMode
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold">{user.streak}</span>
              <span className="text-sm hidden lg:inline">day streak</span>
            </div>

            {/* XP Display */}
            <div
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl ${
                darkMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold">
                {user.xp.toLocaleString()} XP
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                darkMode
                  ? "bg-neutral-800 hover:bg-neutral-700 text-yellow-400"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* ── Notifications ── */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className={`p-2.5 rounded-xl transition-colors relative cursor-pointer ${
                  darkMode
                    ? "bg-neutral-800 hover:bg-neutral-700"
                    : "bg-neutral-100 hover:bg-neutral-200"
                }`}
              >
                <Bell
                  className={`w-5 h-5 ${
                    darkMode ? "text-neutral-300" : "text-neutral-700"
                  }`}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl overflow-hidden ${
                      darkMode
                        ? "bg-neutral-900 border-neutral-800"
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    {/* Header */}
                    <div
                      className={`px-4 py-3 border-b flex items-center justify-between ${
                        darkMode ? "border-neutral-800" : "border-neutral-200"
                      }`}
                    >
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        Notifications
                      </h3>
                      <button
                        className={`text-sm font-medium cursor-pointer transition ${
                          darkMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-700"
                        }`}
                      >
                        Mark all read
                      </button>
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>

                    {/* Footer */}
                    <div
                      className={`px-4 py-3 border-t ${
                        darkMode ? "border-neutral-800" : "border-neutral-200"
                      }`}
                    >
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setNotificationsOpen(false)}
                        className={`text-sm font-medium transition ${
                          darkMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-700"
                        }`}
                      >
                        View all notifications →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Profile Dropdown ── */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 pr-2 sm:pr-3 rounded-xl transition-colors cursor-pointer ${
                  darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
                }`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {user.avatar}
                </div>
                {/* Name & Level */}
                <div className="hidden sm:block text-left">
                  <div
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      darkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {user.name}
                    {user.isPro && (
                      <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    )}
                  </div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Level {user.level}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 hidden sm:block transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  } ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl overflow-hidden ${
                      darkMode
                        ? "bg-neutral-900 border-neutral-800"
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    {/* User Info */}
                    <div
                      className={`px-4 py-4 border-b ${
                        darkMode ? "border-neutral-800" : "border-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`font-semibold flex items-center gap-1 ${
                              darkMode ? "text-white" : "text-neutral-900"
                            }`}
                          >
                            {user.name}
                            {user.isPro && (
                              <Crown className="w-4 h-4 text-yellow-500 shrink-0" />
                            )}
                          </div>
                          <div
                            className={`text-sm truncate ${
                              darkMode ? "text-neutral-400" : "text-neutral-500"
                            }`}
                          >
                            {user.email}
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {[
                          {
                            value: user.level,
                            label: "Level",
                            color: darkMode ? "text-white" : "text-neutral-900",
                          },
                          {
                            value: user.streak,
                            label: "Streak",
                            color: "text-orange-500",
                          },
                          {
                            value: 47,
                            label: "Solved",
                            color: "text-indigo-500",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className={`text-center p-2 rounded-xl ${
                              darkMode ? "bg-neutral-800" : "bg-neutral-100"
                            }`}
                          >
                            <div className={`text-lg font-bold ${stat.color}`}>
                              {stat.value}
                            </div>
                            <div
                              className={`text-xs ${
                                darkMode
                                  ? "text-neutral-400"
                                  : "text-neutral-500"
                              }`}
                            >
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {[
                        {
                          href: "/dashboard/profile",
                          icon: User,
                          label: "Profile",
                        },
                        {
                          href: "/dashboard/achievements",
                          icon: Trophy,
                          label: "Achievements",
                        },
                        {
                          href: "/dashboard/settings",
                          icon: Settings,
                          label: "Settings",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                            darkMode
                              ? "hover:bg-neutral-800 text-neutral-300"
                              : "hover:bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div
                      className={`p-2 border-t ${
                        darkMode ? "border-neutral-800" : "border-neutral-200"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          router.push("/login");
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                          darkMode
                            ? "hover:bg-red-500/10 text-red-400"
                            : "hover:bg-red-50 text-red-600"
                        }`}
                      >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* ── Search Modal ── */}
      <AnimatePresence>
        {searchOpen && (
          <SearchModal
            darkMode={darkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Notification Item ───────────────────────────────────────────────────────
function NotificationItem({ notification, darkMode }) {
  const icons = {
    achievement: Trophy,
    streak: Flame,
    challenge: Zap,
    leaderboard: Crown,
  };
  const Icon = icons[notification.type] || Bell;

  const iconColors = {
    achievement: "text-yellow-500 bg-yellow-500/20",
    streak: "text-orange-500 bg-orange-500/20",
    challenge: "text-indigo-500 bg-indigo-500/20",
    leaderboard: "text-purple-500 bg-purple-500/20",
  };

  return (
    <div
      className={`px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer ${
        !notification.read
          ? darkMode
            ? "bg-indigo-500/5"
            : "bg-indigo-50/50"
          : ""
      } ${darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-50"}`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          iconColors[notification.type]
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-neutral-900"
          }`}
        >
          {notification.title}
        </div>
        <div
          className={`text-sm truncate ${
            darkMode ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          {notification.message}
        </div>
        <div
          className={`text-xs mt-1 flex items-center gap-1 ${
            darkMode ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          <Clock className="w-3 h-3" />
          {notification.time}
        </div>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
      )}
    </div>
  );
}

// ─── Search Modal ─────────────────────────────────────────────────────────────
function SearchModal({ darkMode, searchQuery, setSearchQuery, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const recentSearches = [
    "XSS injection",
    "SQL injection",
    "JWT exploitation",
    "CSRF attack",
  ];

  const popularChallenges = [
    { name: "Cross-Site Scripting (XSS)", difficulty: "Medium", xp: 150 },
    { name: "SQL Injection Basics", difficulty: "Easy", xp: 100 },
    { name: "JWT Token Manipulation", difficulty: "Hard", xp: 250 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden ${
          darkMode
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200"
        }`}
      >
        {/* Search Input */}
        <div
          className={`flex items-center gap-4 px-4 py-4 border-b ${
            darkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <Search
            className={`w-5 h-5 shrink-0 ${
              darkMode ? "text-neutral-400" : "text-neutral-500"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search challenges, topics, badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-lg ${
              darkMode
                ? "text-white placeholder-neutral-500"
                : "text-neutral-900 placeholder-neutral-400"
            }`}
          />
          <kbd
            className={`px-2 py-1 text-xs rounded shrink-0 ${
              darkMode
                ? "bg-neutral-800 text-neutral-400"
                : "bg-neutral-100 text-neutral-500"
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4">
          {!searchQuery ? (
            <>
              {/* Recent Searches */}
              <div className="mb-6">
                <h4
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    darkMode ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchQuery(search)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                        darkMode
                          ? "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Challenges */}
              <div>
                <h4
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    darkMode ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  Popular Challenges
                </h4>
                <div className="space-y-2">
                  {popularChallenges.map((challenge, i) => (
                    <Link
                      key={i}
                      href={`/dashboard/challenges/${i}`}
                      onClick={onClose}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        darkMode
                          ? "hover:bg-neutral-800"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      <div>
                        <div
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {challenge.name}
                        </div>
                        <div
                          className={`text-sm ${
                            darkMode ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          {challenge.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-indigo-500">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">{challenge.xp} XP</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div
              className={`text-center py-8 ${
                darkMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Search results for &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
