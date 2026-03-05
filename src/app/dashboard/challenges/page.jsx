"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/features/theme/themeSlice.js";
import Link from "next/link";
import {
  Search,
  Grid3X3,
  List,
  Zap,
  Users,
  Clock,
  CheckCircle,
  Lock,
  Code2,
  Database,
  Key,
  Globe,
  Server,
  FileCode,
  Bug,
  Shield,
  AlertTriangle,
  Play,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  X,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", name: "All Challenges", icon: Grid3X3, count: 500 },
  { id: "xss", name: "XSS", icon: Code2, count: 45 },
  { id: "sql", name: "SQL Injection", icon: Database, count: 38 },
  { id: "auth", name: "Authentication", icon: Key, count: 52 },
  { id: "csrf", name: "CSRF", icon: Globe, count: 28 },
  { id: "api", name: "API Security", icon: Server, count: 41 },
  { id: "crypto", name: "Cryptography", icon: Shield, count: 35 },
  { id: "file", name: "File Upload", icon: FileCode, count: 22 },
  { id: "injection", name: "Other Injections", icon: Bug, count: 31 },
];

const challengesData = [
  {
    id: 1,
    name: "Reflected XSS Attack",
    category: "xss",
    categoryName: "XSS",
    difficulty: "Easy",
    xp: 100,
    completions: 3420,
    successRate: 85,
    estimatedTime: "15 min",
    status: "completed",
    isBookmarked: false,
    tags: ["OWASP", "Web", "Frontend"],
  },
  {
    id: 2,
    name: "DOM-based XSS",
    category: "xss",
    categoryName: "XSS",
    difficulty: "Medium",
    xp: 150,
    completions: 2180,
    successRate: 72,
    estimatedTime: "25 min",
    status: "completed",
    isBookmarked: true,
    tags: ["OWASP", "DOM", "JavaScript"],
  },
  {
    id: 3,
    name: "Stored XSS Prevention",
    category: "xss",
    categoryName: "XSS",
    difficulty: "Hard",
    xp: 250,
    completions: 890,
    successRate: 58,
    estimatedTime: "40 min",
    status: "in_progress",
    isBookmarked: false,
    tags: ["OWASP", "Database", "Sanitization"],
  },
  {
    id: 4,
    name: "Basic SQL Injection",
    category: "sql",
    categoryName: "SQL Injection",
    difficulty: "Easy",
    xp: 100,
    completions: 4200,
    successRate: 88,
    estimatedTime: "20 min",
    status: "completed",
    isBookmarked: false,
    tags: ["OWASP", "Database", "MySQL"],
  },
  {
    id: 5,
    name: "Blind SQL Injection",
    category: "sql",
    categoryName: "SQL Injection",
    difficulty: "Hard",
    xp: 300,
    completions: 650,
    successRate: 45,
    estimatedTime: "60 min",
    status: "locked",
    isBookmarked: false,
    tags: ["Advanced", "Database", "Time-based"],
  },
  {
    id: 6,
    name: "JWT Token Manipulation",
    category: "auth",
    categoryName: "Authentication",
    difficulty: "Medium",
    xp: 175,
    completions: 1890,
    successRate: 68,
    estimatedTime: "30 min",
    status: "not_started",
    isBookmarked: true,
    tags: ["JWT", "Token", "Auth"],
  },
  {
    id: 7,
    name: "Session Hijacking",
    category: "auth",
    categoryName: "Authentication",
    difficulty: "Hard",
    xp: 250,
    completions: 720,
    successRate: 52,
    estimatedTime: "45 min",
    status: "not_started",
    isBookmarked: false,
    tags: ["Session", "Cookies", "Auth"],
  },
  {
    id: 8,
    name: "CSRF Token Bypass",
    category: "csrf",
    categoryName: "CSRF",
    difficulty: "Medium",
    xp: 150,
    completions: 1450,
    successRate: 71,
    estimatedTime: "25 min",
    status: "not_started",
    isBookmarked: false,
    tags: ["OWASP", "Token", "Forms"],
  },
  {
    id: 9,
    name: "API Rate Limiting",
    category: "api",
    categoryName: "API Security",
    difficulty: "Easy",
    xp: 100,
    completions: 2890,
    successRate: 82,
    estimatedTime: "20 min",
    status: "completed",
    isBookmarked: false,
    tags: ["API", "Rate Limit", "DoS"],
  },
  {
    id: 10,
    name: "Password Hashing",
    category: "crypto",
    categoryName: "Cryptography",
    difficulty: "Easy",
    xp: 100,
    completions: 3100,
    successRate: 79,
    estimatedTime: "15 min",
    status: "not_started",
    isBookmarked: false,
    tags: ["Crypto", "Hashing", "bcrypt"],
  },
  {
    id: 11,
    name: "Insecure File Upload",
    category: "file",
    categoryName: "File Upload",
    difficulty: "Medium",
    xp: 175,
    completions: 1200,
    successRate: 65,
    estimatedTime: "35 min",
    status: "not_started",
    isBookmarked: false,
    tags: ["Upload", "Validation", "MIME"],
  },
  {
    id: 12,
    name: "Command Injection",
    category: "injection",
    categoryName: "Other Injections",
    difficulty: "Hard",
    xp: 275,
    completions: 580,
    successRate: 48,
    estimatedTime: "50 min",
    status: "locked",
    isBookmarked: false,
    tags: ["OS", "Command", "Shell"],
  },
];

const difficulties = ["All", "Easy", "Medium", "Hard"];
const statuses = ["All", "Not Started", "In Progress", "Completed"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "xp-high", label: "Highest XP" },
  { value: "xp-low", label: "Lowest XP" },
  { value: "success-high", label: "Highest Success Rate" },
  { value: "success-low", label: "Lowest Success Rate" },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ChallengesPage() {
  const darkMode = useSelector(selectDarkMode);

  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState(
    challengesData.filter((c) => c.isBookmarked).map((c) => c.id),
  );

  // Filter + Sort
  const filteredChallenges = useMemo(() => {
    let filtered = [...challengesData];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter((c) => c.difficulty === selectedDifficulty);
    }
    if (selectedStatus !== "All") {
      const statusMap = {
        "Not Started": "not_started",
        "In Progress": "in_progress",
        Completed: "completed",
      };
      filtered = filtered.filter((c) => c.status === statusMap[selectedStatus]);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.categoryName.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.completions - a.completions);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "xp-high":
        filtered.sort((a, b) => b.xp - a.xp);
        break;
      case "xp-low":
        filtered.sort((a, b) => a.xp - b.xp);
        break;
      case "success-high":
        filtered.sort((a, b) => b.successRate - a.successRate);
        break;
      case "success-low":
        filtered.sort((a, b) => a.successRate - b.successRate);
        break;
    }

    return filtered;
  }, [
    selectedCategory,
    selectedDifficulty,
    selectedStatus,
    searchQuery,
    sortBy,
  ]);

  const toggleBookmark = (id) => {
    setBookmarkedChallenges((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedDifficulty("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedDifficulty !== "All" ||
    selectedStatus !== "All" ||
    searchQuery;

  // Select styles shared
  const selectClass = `px-4 py-3 rounded-xl border outline-none cursor-pointer text-sm font-medium transition-colors ${
    darkMode
      ? "bg-neutral-800 border-neutral-700 text-white hover:border-neutral-600"
      : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-300"
  }`;

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-bold ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Challenges
          </h1>
          <p
            className={`mt-1 text-sm sm:text-base ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
          >
            {filteredChallenges.length} challenges available
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
            }`}
          >
            <CheckCircle
              className={`w-5 h-5 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
            />
            <span
              className={`font-semibold text-sm ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              47 Solved
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              darkMode ? "bg-indigo-500/10" : "bg-indigo-50"
            }`}
          >
            <Zap
              className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
            />
            <span
              className={`font-semibold text-sm ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              2,450 XP
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Search & Filters Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-4 border ${
          darkMode
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${
                darkMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search challenges, categories, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-12 py-3 rounded-xl border outline-none transition-all text-sm ${
                darkMode
                  ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-indigo-500"
                  : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-indigo-500"
              }`}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg cursor-pointer ${
                    darkMode ? "hover:bg-neutral-700" : "hover:bg-neutral-200"
                  }`}
                >
                  <X
                    className={`w-4 h-4 ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={selectClass}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Difficulties" : d}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={selectClass}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Status" : s}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={selectClass}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div
              className={`flex items-center p-1 rounded-xl ${
                darkMode ? "bg-neutral-800" : "bg-neutral-100"
              }`}
            >
              {[
                { mode: "grid", Icon: Grid3X3 },
                { mode: "list", Icon: List },
              ].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === mode
                      ? darkMode
                        ? "bg-neutral-700 text-white"
                        : "bg-white text-neutral-900 shadow-sm"
                      : darkMode
                        ? "text-neutral-400 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Active Filters ── */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 mt-4 flex-wrap overflow-hidden"
            >
              <span
                className={`text-sm ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
              >
                Active filters:
              </span>
              {selectedCategory !== "all" && (
                <FilterTag
                  label={
                    categories.find((c) => c.id === selectedCategory)?.name ??
                    ""
                  }
                  onRemove={() => setSelectedCategory("all")}
                  darkMode={darkMode}
                />
              )}
              {selectedDifficulty !== "All" && (
                <FilterTag
                  label={selectedDifficulty}
                  onRemove={() => setSelectedDifficulty("All")}
                  darkMode={darkMode}
                />
              )}
              {selectedStatus !== "All" && (
                <FilterTag
                  label={selectedStatus}
                  onRemove={() => setSelectedStatus("All")}
                  darkMode={darkMode}
                />
              )}
              {searchQuery && (
                <FilterTag
                  label={`"${searchQuery}"`}
                  onRemove={() => setSearchQuery("")}
                  darkMode={darkMode}
                />
              )}
              <button
                onClick={clearFilters}
                className={`text-sm font-medium cursor-pointer transition ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="flex gap-6">
        {/* ── Categories Sidebar — Desktop ── */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-64 shrink-0"
        >
          <div
            className={`rounded-2xl p-4 border sticky top-24 ${
              darkMode
                ? "bg-neutral-900 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <h3
              className={`font-semibold mb-4 ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const active = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                      active
                        ? darkMode
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                        : darkMode
                          ? "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <category.icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1 font-medium text-sm">
                      {category.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        active
                          ? darkMode
                            ? "bg-indigo-500/30"
                            : "bg-indigo-100"
                          : darkMode
                            ? "bg-neutral-800"
                            : "bg-neutral-200"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.aside>

        {/* ── Challenges Grid / List ── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {filteredChallenges.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`rounded-2xl p-12 text-center border ${
                  darkMode
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-white border-neutral-200"
                }`}
              >
                <AlertTriangle
                  className={`w-12 h-12 mx-auto mb-4 ${
                    darkMode ? "text-neutral-600" : "text-neutral-400"
                  }`}
                />
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  No challenges found
                </h3>
                <p
                  className={`mb-6 text-sm ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors font-medium cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filteredChallenges.map((challenge, index) => (
                  <ChallengeGridCard
                    key={challenge.id}
                    challenge={challenge}
                    darkMode={darkMode}
                    index={index}
                    isBookmarked={bookmarkedChallenges.includes(challenge.id)}
                    onToggleBookmark={() => toggleBookmark(challenge.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {filteredChallenges.map((challenge, index) => (
                  <ChallengeListCard
                    key={challenge.id}
                    challenge={challenge}
                    darkMode={darkMode}
                    index={index}
                    isBookmarked={bookmarkedChallenges.includes(challenge.id)}
                    onToggleBookmark={() => toggleBookmark(challenge.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Tag ───────────────────────────────────────────────────────────────

function FilterTag({ label, onRemove, darkMode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
        darkMode
          ? "bg-indigo-500/20 text-indigo-400"
          : "bg-indigo-100 text-indigo-600"
      }`}
    >
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 rounded-full hover:bg-black/10 cursor-pointer transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─── Difficulty Config Helper ─────────────────────────────────────────────────

function getDifficultyConfig(difficulty, darkMode) {
  const config = {
    Easy: {
      bg: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
      text: darkMode ? "text-emerald-400" : "text-emerald-600",
      bar: "from-emerald-500 to-teal-500",
    },
    Medium: {
      bg: darkMode ? "bg-yellow-500/20" : "bg-yellow-100",
      text: darkMode ? "text-yellow-400" : "text-yellow-600",
      bar: "from-yellow-500 to-orange-500",
    },
    Hard: {
      bg: darkMode ? "bg-red-500/20" : "bg-red-100",
      text: darkMode ? "text-red-400" : "text-red-600",
      bar: "from-red-500 to-pink-500",
    },
  };
  return config[difficulty] ?? config.Easy;
}

// ─── Status Config Helper ─────────────────────────────────────────────────────

function getStatusConfig(status, darkMode) {
  const config = {
    completed: {
      Icon: CheckCircle,
      color: "text-emerald-500",
      bg: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
      label: "Completed",
    },
    in_progress: {
      Icon: Clock,
      color: "text-yellow-500",
      bg: darkMode ? "bg-yellow-500/20" : "bg-yellow-100",
      label: "In Progress",
    },
    not_started: {
      Icon: Play,
      color: darkMode ? "text-neutral-400" : "text-neutral-500",
      bg: darkMode ? "bg-neutral-800" : "bg-neutral-100",
      label: "Not Started",
    },
    locked: {
      Icon: Lock,
      color: darkMode ? "text-neutral-600" : "text-neutral-400",
      bg: darkMode ? "bg-neutral-800" : "bg-neutral-100",
      label: "Locked",
    },
  };
  return config[status] ?? config.not_started;
}

// ─── Challenge Grid Card ──────────────────────────────────────────────────────

function ChallengeGridCard({
  challenge,
  darkMode,
  index,
  isBookmarked,
  onToggleBookmark,
}) {
  const difficulty = getDifficultyConfig(challenge.difficulty, darkMode);
  const status = getStatusConfig(challenge.status, darkMode);
  const { Icon: StatusIcon } = status;
  const isLocked = challenge.status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!isLocked ? { y: -4 } : {}}
      className={`group rounded-2xl border overflow-hidden transition-all ${
        isLocked
          ? darkMode
            ? "bg-neutral-900/50 border-neutral-800 opacity-60"
            : "bg-neutral-50 border-neutral-200 opacity-60"
          : darkMode
            ? "bg-neutral-900 border-neutral-800 hover:border-indigo-500/50"
            : "bg-white border-neutral-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5"
      }`}
    >
      {/* Difficulty Bar */}
      <div className={`h-1 w-full ${difficulty.bg}`}>
        <div
          className={`h-full bg-linear-to-r ${difficulty.bar}`}
          style={{ width: `${challenge.successRate}%` }}
        />
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2 py-1 rounded-lg text-xs font-semibold ${difficulty.bg} ${difficulty.text}`}
            >
              {challenge.difficulty}
            </span>
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                darkMode
                  ? "bg-neutral-800 text-neutral-400"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {challenge.categoryName}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isBookmarked
                ? "text-yellow-500"
                : darkMode
                  ? "text-neutral-600 hover:text-neutral-400"
                  : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold mb-3 group-hover:text-indigo-500 transition-colors ${
            darkMode ? "text-white" : "text-neutral-900"
          }`}
        >
          {challenge.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {challenge.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                darkMode
                  ? "bg-neutral-800 text-neutral-400"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users
                className={`w-4 h-4 ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              />
              <span
                className={darkMode ? "text-neutral-400" : "text-neutral-500"}
              >
                {challenge.completions.toLocaleString()}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp
                className={`w-4 h-4 ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              />
              <span
                className={darkMode ? "text-neutral-400" : "text-neutral-500"}
              >
                {challenge.successRate}%
              </span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock
              className={`w-4 h-4 ${
                darkMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            />
            <span
              className={darkMode ? "text-neutral-400" : "text-neutral-500"}
            >
              {challenge.estimatedTime}
            </span>
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
            <span
              className={`text-sm ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {status.label}
            </span>
          </div>
          <Link
            href={isLocked ? "#" : `/dashboard/challenges/${challenge.id}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              isLocked
                ? darkMode
                  ? "bg-neutral-800 text-neutral-600 cursor-not-allowed pointer-events-none"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none"
                : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25"
            }`}
          >
            <Zap className="w-4 h-4" />
            {challenge.xp} XP
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Challenge List Card ──────────────────────────────────────────────────────

function ChallengeListCard({
  challenge,
  darkMode,
  index,
  isBookmarked,
  onToggleBookmark,
}) {
  const difficulty = getDifficultyConfig(challenge.difficulty, darkMode);
  const status = getStatusConfig(challenge.status, darkMode);
  const { Icon: StatusIcon } = status;
  const isLocked = challenge.status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
        isLocked
          ? darkMode
            ? "bg-neutral-900/50 border-neutral-800 opacity-60"
            : "bg-neutral-50 border-neutral-200 opacity-60"
          : darkMode
            ? "bg-neutral-900 border-neutral-800 hover:border-indigo-500/50"
            : "bg-white border-neutral-200 hover:border-indigo-300 hover:shadow-md"
      }`}
    >
      {/* Status Icon Block */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${status.bg}`}
      >
        <StatusIcon className={`w-5 h-5 ${status.color}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3
            className={`font-semibold group-hover:text-indigo-500 transition-colors ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            {challenge.name}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficulty.bg} ${difficulty.text}`}
          >
            {challenge.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <span className={darkMode ? "text-neutral-400" : "text-neutral-500"}>
            {challenge.categoryName}
          </span>
          <span className="flex items-center gap-1">
            <Users
              className={`w-4 h-4 ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}
            />
            <span
              className={darkMode ? "text-neutral-400" : "text-neutral-500"}
            >
              {challenge.completions.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp
              className={`w-4 h-4 ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}
            />
            <span
              className={darkMode ? "text-neutral-400" : "text-neutral-500"}
            >
              {challenge.successRate}%
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock
              className={`w-4 h-4 ${darkMode ? "text-neutral-500" : "text-neutral-400"}`}
            />
            <span
              className={darkMode ? "text-neutral-400" : "text-neutral-500"}
            >
              {challenge.estimatedTime}
            </span>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleBookmark();
          }}
          className={`p-2 rounded-xl transition-colors cursor-pointer ${
            isBookmarked
              ? "text-yellow-500 bg-yellow-500/10"
              : darkMode
                ? "text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
                : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          }`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
        <Link
          href={isLocked ? "#" : `/dashboard/challenges/${challenge.id}`}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            isLocked
              ? darkMode
                ? "bg-neutral-800 text-neutral-600 cursor-not-allowed pointer-events-none"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none"
              : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{challenge.xp} XP</span>
        </Link>
      </div>
    </motion.div>
  );
}
