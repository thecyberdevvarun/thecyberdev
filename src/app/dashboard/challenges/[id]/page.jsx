"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { selectDarkMode } from "../../../../redux/features/theme/themeSlice.js";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Eye,
  Clock,
  Zap,
  Users,
  TrendingUp,
  Terminal,
  Bug,
  Target,
  Copy,
  Check,
  BookOpen,
  Share2,
  Bookmark,
  BookmarkCheck,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink,
  Loader2,
  Trophy,
  X,
} from "lucide-react";

// ─── Mock Challenge Data ──────────────────────────────────────────────────────

const challengeData = {
  id: 1,
  name: "Cross-Site Scripting (XSS) Prevention",
  category: "XSS",
  difficulty: "Medium",
  xp: 150,
  completions: 2180,
  successRate: 72,
  estimatedTime: "25 min",
  description: `In this challenge, you'll learn to identify and fix a Cross-Site Scripting (XSS) vulnerability.

The vulnerable code takes user input and displays it directly on the page without proper sanitization, allowing attackers to inject malicious scripts.

Your task is to modify the code to properly sanitize user input and prevent XSS attacks.`,
  objectives: [
    "Identify the XSS vulnerability in the code",
    "Implement proper input sanitization",
    "Use htmlspecialchars() with appropriate flags",
    "Test that the fix prevents script injection",
  ],
  hints: [
    {
      id: 1,
      title: "Where to look",
      content:
        "Focus on line 8 where user input is being echoed. The $_GET variable is being used directly without sanitization.",
      xpCost: 10,
    },
    {
      id: 2,
      title: "The solution approach",
      content:
        "Use htmlspecialchars() function to convert special characters to HTML entities. Don't forget to specify ENT_QUOTES flag.",
      xpCost: 25,
    },
    {
      id: 3,
      title: "Full solution",
      content:
        "Replace $username with htmlspecialchars($username, ENT_QUOTES, 'UTF-8') before echoing.",
      xpCost: 50,
    },
  ],
  resources: [
    {
      title: "OWASP XSS Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
    },
    {
      title: "PHP htmlspecialchars() Documentation",
      url: "https://www.php.net/manual/en/function.htmlspecialchars.php",
    },
    {
      title: "Understanding XSS Attacks",
      url: "https://portswigger.net/web-security/cross-site-scripting",
    },
  ],
  testCases: [
    {
      name: "Basic XSS Script Tag",
      input: "<script>alert('XSS')</script>",
      expected: "Should be escaped as HTML entities",
    },
    {
      name: "Event Handler XSS",
      input: '" onmouseover="alert(\'XSS\')"',
      expected: "Quotes should be escaped",
    },
    {
      name: "Normal Input",
      input: "John Doe",
      expected: "Should display normally",
    },
  ],
  starterCode: `<?php
// User profile display - VULNERABLE CODE
// Fix the XSS vulnerability below

$username = $_GET['name'];
$email = $_GET['email'];

// Display welcome message
echo "<h1>Welcome, " . $username . "!</h1>";
echo "<p>Email: " . $email . "</p>";

// Profile section
echo "<div class='profile'>";
echo "<p>Bio: " . $_GET['bio'] . "</p>";
echo "</div>";
?>`,
  solutionCode: `<?php
// User profile display - SECURE CODE
// XSS vulnerability has been fixed

$username = $_GET['name'] ?? 'Guest';
$email = $_GET['email'] ?? '';
$bio = $_GET['bio'] ?? '';

// Sanitize all user inputs
$safeName = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeBio = htmlspecialchars($bio, ENT_QUOTES, 'UTF-8');

// Display welcome message with sanitized output
echo "<h1>Welcome, " . $safeName . "!</h1>";
echo "<p>Email: " . $safeEmail . "</p>";

// Profile section
echo "<div class='profile'>";
echo "<p>Bio: " . $safeBio . "</p>";
echo "</div>";
?>`,
};

// ─── Difficulty Badge ─────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty, darkMode }) {
  const colors = {
    Easy: darkMode
      ? "bg-emerald-500/20 text-emerald-400"
      : "bg-emerald-100 text-emerald-600",
    Medium: darkMode
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-yellow-100 text-yellow-600",
    Hard: darkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        colors[difficulty] ?? colors.Medium
      }`}
    >
      {difficulty}
    </span>
  );
}

// ─── Hint Card ────────────────────────────────────────────────────────────────

function HintCard({ hint, isRevealed, onReveal, darkMode }) {
  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        darkMode
          ? "bg-neutral-800 border-neutral-700"
          : "bg-neutral-50 border-neutral-200"
      }`}
    >
      <button
        onClick={onReveal}
        disabled={isRevealed}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors cursor-pointer ${
          isRevealed
            ? ""
            : darkMode
              ? "hover:bg-neutral-700"
              : "hover:bg-neutral-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <Lightbulb
            className={`w-5 h-5 shrink-0 ${
              isRevealed
                ? "text-yellow-500"
                : darkMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
            }`}
          />
          <div>
            <div
              className={`font-medium text-sm ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              {hint.title}
            </div>
            {!isRevealed && (
              <div
                className={`text-xs mt-0.5 ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                -{hint.xpCost} XP to reveal
              </div>
            )}
          </div>
        </div>
        {!isRevealed && (
          <span
            className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
              darkMode
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            Reveal
          </span>
        )}
      </button>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`border-t overflow-hidden ${
              darkMode ? "border-neutral-700" : "border-neutral-200"
            }`}
          >
            <p
              className={`p-4 text-sm leading-relaxed ${
                darkMode ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              {hint.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────

function SuccessModal({
  darkMode,
  xpEarned,
  timeTaken,
  hintsUsed,
  onClose,
  challengeName,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-md rounded-3xl p-8 text-center overflow-hidden ${
          darkMode ? "bg-neutral-900" : "bg-white"
        }`}
      >
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100 - 50, opacity: 1 }}
              animate={{
                y: 500,
                x: Math.random() * 200 - 100,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className={`absolute w-3 h-3 rounded-full ${
                [
                  "bg-indigo-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-yellow-500",
                  "bg-emerald-500",
                ][i % 5]
              }`}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer z-10 ${
            darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
          }`}
        >
          <X
            className={`w-5 h-5 ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          />
        </button>

        {/* Trophy */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-500/30"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl sm:text-3xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-neutral-900"
          }`}
        >
          Challenge Complete! 🎉
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`mb-6 text-sm sm:text-base ${
            darkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          You successfully completed &quot;{challengeName}&quot;
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            {
              value: (
                <span className="flex items-center justify-center gap-1 text-indigo-500">
                  <Zap className="w-5 h-5" />
                  {xpEarned}
                </span>
              ),
              label: "XP Earned",
            },
            {
              value: (
                <span className={darkMode ? "text-white" : "text-neutral-900"}>
                  {timeTaken}
                </span>
              ),
              label: "Time Taken",
            },
            {
              value: (
                <span
                  className={
                    hintsUsed === 0 ? "text-emerald-500" : "text-yellow-500"
                  }
                >
                  {hintsUsed}
                </span>
              ),
              label: "Hints Used",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl ${
                darkMode ? "bg-neutral-800" : "bg-neutral-100"
              }`}
            >
              <div className="text-xl sm:text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <div
                className={`text-xs ${
                  darkMode ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* No Hints Badge */}
        {hintsUsed === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`flex items-center gap-3 p-4 rounded-2xl mb-6 ${
              darkMode
                ? "bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                : "bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div
                className={`font-bold ${
                  darkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                No Hints Badge! 🏆
              </div>
              <div
                className={`text-sm ${
                  darkMode ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Solved without using any hints
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/dashboard/challenges"
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
              darkMode
                ? "bg-neutral-800 hover:bg-neutral-700 text-white"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
            }`}
          >
            More Challenges
          </Link>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function ChallengeSolverPage() {
  const darkMode = useSelector(selectDarkMode);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [code, setCode] = useState(challengeData.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [revealedHints, setRevealedHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hintsXpUsed, setHintsXpUsed] = useState(0);

  // ── Timer ──
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const finalXp = Math.max(0, challengeData.xp - hintsXpUsed);

  // ── Run Tests ──
  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleOutput([{ type: "info", message: "Running security tests..." }]);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const hasHtmlSpecialChars = code.includes("htmlspecialchars");
    const hasEntQuotes = code.includes("ENT_QUOTES");
    const hasSanitizedOutput = !code.includes(
      'echo "<h1>Welcome, " . $username',
    );

    const results = {
      passed: hasHtmlSpecialChars && hasEntQuotes && hasSanitizedOutput,
      tests: [
        {
          name: "XSS Script Tag Prevention",
          passed: hasHtmlSpecialChars,
          message: hasHtmlSpecialChars
            ? "Script tags are properly escaped"
            : "Script tags can still be injected",
        },
        {
          name: "Quote Escaping",
          passed: hasEntQuotes,
          message: hasEntQuotes
            ? "Quotes are properly escaped with ENT_QUOTES"
            : "Quotes are not properly escaped",
        },
        {
          name: "Sanitized Output",
          passed: hasSanitizedOutput,
          message: hasSanitizedOutput
            ? "All outputs use sanitized variables"
            : "Raw user input is still being echoed",
        },
      ],
    };

    setTestResults(results);
    setConsoleOutput((prev) => [
      ...prev,
      { type: "info", message: "Test execution complete" },
      ...results.tests.map((test) => ({
        type: test.passed ? "success" : "error",
        message: `${test.passed ? "✓" : "✗"} ${test.name}: ${test.message}`,
      })),
      {
        type: results.passed ? "success" : "error",
        message: results.passed
          ? "🎉 All tests passed! Challenge completed!"
          : "❌ Some tests failed. Keep trying!",
      },
    ]);

    setIsRunning(false);

    if (results.passed) {
      setIsTimerRunning(false);
      setTimeout(() => setShowSuccessModal(true), 500);
    }
  };

  // ── Reset ──
  const handleReset = () => {
    setCode(challengeData.starterCode);
    setTestResults(null);
    setConsoleOutput([]);
    setShowSolution(false);
  };

  // ── Copy ──
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Hints ──
  const revealHint = (hint) => {
    if (!revealedHints.includes(hint.id)) {
      setRevealedHints((prev) => [...prev, hint.id]);
      setHintsXpUsed((prev) => prev + hint.xpCost);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCode(challengeData.solutionCode);
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50" : "-m-4 sm:-m-6 lg:-m-8"} ${
        darkMode ? "bg-neutral-950" : "bg-neutral-100"
      }`}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 border-b ${
          darkMode
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/challenges"
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
            }`}
          >
            <ArrowLeft
              className={`w-5 h-5 ${
                darkMode ? "text-neutral-300" : "text-neutral-700"
              }`}
            />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1
                className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                {challengeData.name}
              </h1>
              <DifficultyBadge
                difficulty={challengeData.difficulty}
                darkMode={darkMode}
              />
            </div>
            <div
              className={`flex items-center gap-4 text-sm mt-1 ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              <span>{challengeData.category}</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {challengeData.completions.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {challengeData.successRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
              darkMode ? "bg-neutral-800" : "bg-neutral-100"
            }`}
          >
            <Clock
              className={`w-4 h-4 ${
                darkMode ? "text-neutral-400" : "text-neutral-500"
              }`}
            />
            <span
              className={`font-mono font-medium text-sm ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              {formatTime(elapsedTime)}
            </span>
          </div>

          {/* XP */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
              darkMode ? "bg-indigo-500/20" : "bg-indigo-100"
            }`}
          >
            <Zap className="w-4 h-4 text-indigo-500" />
            <span
              className={`font-bold text-sm ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              {finalXp} XP
            </span>
            {hintsXpUsed > 0 && (
              <span
                className={`text-xs ${
                  darkMode ? "text-indigo-400/60" : "text-indigo-500/60"
                }`}
              >
                (-{hintsXpUsed})
              </span>
            )}
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isBookmarked
                ? "text-yellow-500 bg-yellow-500/10"
                : darkMode
                  ? "hover:bg-neutral-800 text-neutral-400"
                  : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded-xl transition-colors cursor-pointer hidden sm:block ${
              darkMode
                ? "hover:bg-neutral-800 text-neutral-400"
                : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* ── Main Layout ── */}
      <div
        className={`flex flex-col lg:flex-row ${
          isFullscreen ? "h-[calc(100vh-73px)]" : "h-[calc(100vh-200px)]"
        }`}
      >
        {/* ── Left Panel ── */}
        <div
          className={`w-full lg:w-96 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto ${
            darkMode
              ? "bg-neutral-900 border-neutral-800"
              : "bg-white border-neutral-200"
          }`}
        >
          {/* Tabs */}
          <div
            className={`flex border-b sticky top-0 z-10 ${
              darkMode
                ? "bg-neutral-900 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            {["description", "hints", "resources"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? darkMode
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-indigo-600 border-b-2 border-indigo-600"
                    : darkMode
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {tab}
                {tab === "hints" && revealedHints.length > 0 && (
                  <span className="ml-1 text-xs opacity-70">
                    ({revealedHints.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {/* ── Description ── */}
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p
                    className={`text-sm leading-relaxed whitespace-pre-line mb-6 ${
                      darkMode ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {challengeData.description}
                  </p>

                  <h3
                    className={`font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    <Target className="w-5 h-5 text-indigo-500" />
                    Objectives
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {challengeData.objectives.map((obj, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm ${
                          darkMode ? "text-neutral-400" : "text-neutral-600"
                        }`}
                      >
                        <CheckCircle
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            darkMode ? "text-neutral-600" : "text-neutral-400"
                          }`}
                        />
                        {obj}
                      </li>
                    ))}
                  </ul>

                  <h3
                    className={`font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    <Bug className="w-5 h-5 text-red-500" />
                    Test Cases
                  </h3>
                  <div className="space-y-2">
                    {challengeData.testCases.map((test, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl ${
                          darkMode ? "bg-neutral-800" : "bg-neutral-100"
                        }`}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            darkMode ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {test.name}
                        </div>
                        <div
                          className={`text-xs font-mono break-all ${
                            darkMode ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          Input: {test.input}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Hints ── */}
              {activeTab === "hints" && (
                <motion.div
                  key="hints"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Warning */}
                  <div
                    className={`p-3 rounded-xl mb-2 ${
                      darkMode
                        ? "bg-yellow-500/10 border border-yellow-500/20"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        darkMode ? "text-yellow-400" : "text-yellow-700"
                      }`}
                    >
                      💡 Using hints will reduce your XP reward. Try solving
                      without hints for maximum XP!
                    </p>
                  </div>

                  {challengeData.hints.map((hint) => (
                    <HintCard
                      key={hint.id}
                      hint={hint}
                      isRevealed={revealedHints.includes(hint.id)}
                      onReveal={() => revealHint(hint)}
                      darkMode={darkMode}
                    />
                  ))}

                  {/* Show Solution */}
                  <div
                    className={`mt-6 pt-4 border-t ${
                      darkMode ? "border-neutral-800" : "border-neutral-200"
                    }`}
                  >
                    <button
                      onClick={handleShowSolution}
                      disabled={showSolution}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-colors cursor-pointer font-medium ${
                        showSolution
                          ? darkMode
                            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                            : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                          : darkMode
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {showSolution ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Solution Revealed
                        </>
                      ) : (
                        <>
                          <Eye className="w-5 h-5" />
                          Show Solution (No XP)
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Resources ── */}
              {activeTab === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    Learn more about this vulnerability and how to prevent it:
                  </p>

                  {challengeData.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all group ${
                        darkMode
                          ? "bg-neutral-800 border-neutral-700 hover:border-indigo-500/50"
                          : "bg-neutral-50 border-neutral-200 hover:border-indigo-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          darkMode ? "bg-neutral-700" : "bg-neutral-200"
                        }`}
                      >
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium text-sm group-hover:text-indigo-500 transition-colors ${
                            darkMode ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {resource.title}
                        </div>
                        <div
                          className={`text-xs truncate mt-0.5 ${
                            darkMode ? "text-neutral-500" : "text-neutral-400"
                          }`}
                        >
                          {resource.url}
                        </div>
                      </div>
                      <ExternalLink
                        className={`w-4 h-4 shrink-0 ${
                          darkMode ? "text-neutral-500" : "text-neutral-400"
                        }`}
                      />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right Panel — Code Editor ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-[#1e1e1e] border-neutral-800">
            <div className="flex items-center gap-3">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-neutral-400 text-sm">challenge.php</span>
              {showSolution && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  Solution
                </span>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-neutral-400" />
              )}
            </button>
          </div>

          {/* Code Textarea */}
          <div className="flex-1 bg-[#1e1e1e] overflow-auto">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 bg-transparent text-neutral-100 font-mono text-sm resize-none outline-none"
              style={{ minHeight: "300px" }}
            />
          </div>

          {/* Editor Actions Bar */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-t ${
              darkMode
                ? "bg-neutral-900 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <button
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer text-sm font-medium ${
                darkMode
                  ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <motion.button
              onClick={handleRunCode}
              disabled={isRunning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                isRunning
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25"
              } text-white`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run Tests
                </>
              )}
            </motion.button>
          </div>

          {/* ── Console Output ── */}
          <AnimatePresence>
            {showConsole && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t overflow-hidden bg-[#1e1e1e] border-neutral-800"
              >
                {/* Console Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-neutral-300 text-sm font-medium">
                      Output
                    </span>
                  </div>
                  <button
                    onClick={() => setShowConsole(false)}
                    className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                {/* Console Lines */}
                <div className="p-4 max-h-48 overflow-y-auto font-mono text-sm">
                  {consoleOutput.length === 0 ? (
                    <span className="text-neutral-500">
                      Click &quot;Run Tests&quot; to execute your code...
                    </span>
                  ) : (
                    <div className="space-y-1">
                      {consoleOutput.map((line, i) => (
                        <div
                          key={i}
                          className={
                            line.type === "success"
                              ? "text-emerald-400"
                              : line.type === "error"
                                ? "text-red-400"
                                : line.type === "info"
                                  ? "text-cyan-400"
                                  : "text-neutral-300"
                          }
                        >
                          {line.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Test Results Summary */}
                {testResults && (
                  <div
                    className={`px-4 py-3 border-t border-neutral-800 ${
                      testResults.passed ? "bg-emerald-500/10" : "bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {testResults.passed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span
                          className={
                            testResults.passed
                              ? "text-emerald-400 text-sm"
                              : "text-red-400 text-sm"
                          }
                        >
                          {testResults.tests.filter((t) => t.passed).length}/
                          {testResults.tests.length} tests passed
                        </span>
                      </div>
                      {testResults.passed && (
                        <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                          <Zap className="w-4 h-4" />+{finalXp} XP
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show Console Button */}
          {!showConsole && (
            <button
              onClick={() => setShowConsole(true)}
              className={`flex items-center justify-center gap-2 px-4 py-2 border-t text-sm cursor-pointer transition-colors ${
                darkMode
                  ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                  : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Terminal className="w-4 h-4" />
              Show Console
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            darkMode={darkMode}
            xpEarned={finalXp}
            timeTaken={formatTime(elapsedTime)}
            hintsUsed={revealedHints.length}
            onClose={() => setShowSuccessModal(false)}
            challengeName={challengeData.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
