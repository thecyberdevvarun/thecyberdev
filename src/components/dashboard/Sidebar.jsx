"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../redux/features/theme/themeSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  Trophy,
  Settings,
  Award,
  Flame,
  Target,
  BookOpen,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bookmark,
  History,
  HelpCircle,
  X,
} from "lucide-react";

// ─── Nav Config ───────────────────────────────────────────────────────────────

const mainNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Challenges",
    href: "/dashboard/challenges",
    icon: Code2,
    badge: "500+",
  },
  {
    name: "My Progress",
    href: "/dashboard/progress",
    icon: Target,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    name: "Achievements",
    href: "/dashboard/achievements",
    icon: Award,
    badge: "3 New",
    badgeColor: "emerald",
  },
];

const secondaryNavItems = [
  {
    name: "Bookmarked",
    href: "/dashboard/bookmarked",
    icon: Bookmark,
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "Learning Paths",
    href: "/dashboard/paths",
    icon: BookOpen,
  },
  {
    name: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
];

const bottomNavItems = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/dashboard/help-support",
    icon: HelpCircle,
  },
];

// ─── User Stats (mock — replace with Redux/API later) ─────────────────────────

const userStats = {
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  streak: 7,
  rank: 234,
};

// ─── Sidebar Component ────────────────────────────────────────────────────────

export default function Sidebar({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}) {
  const darkMode = useSelector(selectDarkMode);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    setIsOpen(false);
    router.push("/login");
  };

  const xpPercent = Math.round((userStats.xp / userStats.xpToNext) * 100);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP SIDEBAR
      ════════════════════════════════════════ */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 hidden lg:flex flex-col ${
          isCollapsed ? "w-20" : "w-72"
        } ${
          darkMode
            ? "bg-neutral-900 border-r border-neutral-800"
            : "bg-white border-r border-neutral-200"
        }`}
      >
        {/* ── Logo ── */}
        <div
          className={`flex items-center h-16 lg:h-20 px-4 border-b shrink-0 ${
            darkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xl font-bold overflow-hidden whitespace-nowrap ${
                    darkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  the<span className="text-indigo-500">cyber</span>dev
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* ── User Stats Card (expanded) ── */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pt-4 shrink-0 overflow-hidden"
            >
              <div
                className={`p-4 rounded-2xl ${
                  darkMode
                    ? "bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
                    : "bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-200"
                }`}
              >
                {/* Level + Streak */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                      {userStats.level}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          darkMode ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        Level {userStats.level}
                      </div>
                      <div
                        className={`text-xs ${
                          darkMode ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        Security Pro
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      {userStats.streak}
                    </span>
                  </div>
                </div>

                {/* XP Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={
                        darkMode ? "text-neutral-400" : "text-neutral-500"
                      }
                    >
                      {userStats.xp.toLocaleString()} XP
                    </span>
                    <span
                      className={
                        darkMode ? "text-neutral-400" : "text-neutral-500"
                      }
                    >
                      {userStats.xpToNext.toLocaleString()} XP
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? "bg-neutral-700" : "bg-neutral-200"
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercent}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Collapsed User Stats ── */}
        {isCollapsed && (
          <div className="flex flex-col items-center gap-2 py-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {userStats.level}
            </div>
            <div className="flex items-center gap-0.5 text-orange-500">
              <Flame className="w-3 h-3" />
              <span className="text-xs font-bold">{userStats.streak}</span>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main */}
          <div className="space-y-1">
            {!isCollapsed && (
              <p
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                Main
              </p>
            )}
            {mainNavItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Library */}
          <div className="mt-6 space-y-1">
            {!isCollapsed && (
              <p
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                Library
              </p>
            )}
            {secondaryNavItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
                darkMode={darkMode}
              />
            ))}
          </div>
        </nav>

        {/* ── Bottom Section ── */}
        <div
          className={`px-3 py-4 border-t shrink-0 ${
            darkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mt-2 transition-all cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            } ${
              darkMode
                ? "text-red-400 hover:bg-red-500/10"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* ── Collapse Toggle Button ── */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-24 w-6 h-6 rounded-full border shadow-md flex items-center justify-center transition-colors cursor-pointer z-10 ${
            darkMode
              ? "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
              : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* ════════════════════════════════════════
          MOBILE SIDEBAR
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 left-0 h-full w-72 z-50 lg:hidden flex flex-col ${
              darkMode
                ? "bg-neutral-900 border-r border-neutral-800"
                : "bg-white border-r border-neutral-200"
            }`}
          >
            {/* ── Mobile Header ── */}
            <div
              className={`flex items-center justify-between h-16 px-4 border-b shrink-0 ${
                darkMode ? "border-neutral-800" : "border-neutral-200"
              }`}
            >
              <Link
                href="/dashboard"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  the<span className="text-indigo-500">cyber</span>dev
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
                }`}
              >
                <X
                  className={`w-5 h-5 ${
                    darkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                />
              </button>
            </div>

            {/* ── Mobile User Stats Card ── */}
            <div className="px-4 pt-4 shrink-0">
              <div
                className={`p-4 rounded-2xl ${
                  darkMode
                    ? "bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
                    : "bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                      {userStats.level}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          darkMode ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        Level {userStats.level}
                      </div>
                      <div
                        className={`text-xs ${
                          darkMode ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        Security Pro
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      {userStats.streak}
                    </span>
                  </div>
                </div>

                {/* XP Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={
                        darkMode ? "text-neutral-400" : "text-neutral-500"
                      }
                    >
                      {userStats.xp.toLocaleString()} XP
                    </span>
                    <span
                      className={
                        darkMode ? "text-neutral-400" : "text-neutral-500"
                      }
                    >
                      {userStats.xpToNext.toLocaleString()} XP
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? "bg-neutral-700" : "bg-neutral-200"
                    }`}
                  >
                    <div
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mobile Navigation ── */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {/* Main */}
              <div className="space-y-1">
                <p
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                    darkMode ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  Main
                </p>
                {mainNavItems.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                    isCollapsed={false}
                    darkMode={darkMode}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Library */}
              <div className="mt-6 space-y-1">
                <p
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                    darkMode ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  Library
                </p>
                {secondaryNavItems.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                    isCollapsed={false}
                    darkMode={darkMode}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </nav>

            {/* ── Mobile Bottom ── */}
            <div
              className={`px-3 py-4 border-t shrink-0 ${
                darkMode ? "border-neutral-800" : "border-neutral-200"
              }`}
            >
              <div className="space-y-1">
                {bottomNavItems.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                    isCollapsed={false}
                    darkMode={darkMode}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mt-2 transition-all cursor-pointer ${
                  darkMode
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── NavItem Component ────────────────────────────────────────────────────────

function NavItem({ item, isActive, isCollapsed, darkMode, onClick }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
        isCollapsed ? "justify-center" : ""
      } ${
        isActive
          ? darkMode
            ? "bg-indigo-500/20 text-indigo-400"
            : "bg-indigo-50 text-indigo-600"
          : darkMode
            ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
      }`}
    >
      {/* Active Indicator */}
      {isActive && !isCollapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
      )}

      <item.icon
        className={`w-5 h-5 shrink-0 transition-transform ${
          !isActive ? "group-hover:scale-110" : ""
        }`}
      />

      {!isCollapsed && (
        <>
          <span className="font-medium flex-1">{item.name}</span>
          {item.badge && (
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                item.badgeColor === "emerald"
                  ? darkMode
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-100 text-emerald-600"
                  : darkMode
                    ? "bg-neutral-700 text-neutral-300"
                    : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {item.badge}
            </span>
          )}
        </>
      )}

      {/* Collapsed Tooltip */}
      {isCollapsed && (
        <div
          className={`absolute left-full ml-3 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 shadow-xl ${
            darkMode
              ? "bg-neutral-800 text-white border border-neutral-700"
              : "bg-neutral-900 text-white"
          }`}
        >
          {item.name}
          {item.badge && (
            <span className="ml-2 text-xs opacity-60">({item.badge})</span>
          )}
          {/* Tooltip arrow */}
          <span
            className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${
              darkMode ? "border-r-neutral-800" : "border-r-neutral-900"
            }`}
          />
        </div>
      )}
    </Link>
  );
}
