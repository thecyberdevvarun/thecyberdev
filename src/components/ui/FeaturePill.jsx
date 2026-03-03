"use client";

import { useSelector } from "react-redux";
import { selectDarkMode } from "../../redux/slices/themeSlice";

const colorMap = {
  indigo: {
    bg: { dark: "bg-indigo-500/10", light: "bg-indigo-500/10" },
    border: { dark: "border-indigo-500/20", light: "border-indigo-500/20" },
    icon: { dark: "text-indigo-400", light: "text-indigo-600" },
    title: { dark: "text-indigo-300", light: "text-indigo-700" },
  },
  emerald: {
    bg: { dark: "bg-emerald-500/10", light: "bg-emerald-500/10" },
    border: { dark: "border-emerald-500/20", light: "border-emerald-500/20" },
    icon: { dark: "text-emerald-400", light: "text-emerald-600" },
    title: { dark: "text-emerald-300", light: "text-emerald-700" },
  },
  orange: {
    bg: { dark: "bg-orange-500/10", light: "bg-orange-500/10" },
    border: { dark: "border-orange-500/20", light: "border-orange-500/20" },
    icon: { dark: "text-orange-400", light: "text-orange-600" },
    title: { dark: "text-orange-300", light: "text-orange-700" },
  },
  yellow: {
    bg: { dark: "bg-yellow-500/10", light: "bg-yellow-500/10" },
    border: { dark: "border-yellow-500/20", light: "border-yellow-500/20" },
    icon: { dark: "text-yellow-400", light: "text-yellow-600" },
    title: { dark: "text-yellow-300", light: "text-yellow-700" },
  },
  green: {
    bg: { dark: "bg-green-500/10", light: "bg-green-500/10" },
    border: { dark: "border-green-500/20", light: "border-green-500/20" },
    icon: { dark: "text-green-400", light: "text-green-600" },
    title: { dark: "text-green-300", light: "text-green-700" },
  },
};

export function FeaturePill({ icon, title, description, color = "indigo" }) {
  const darkMode = useSelector(selectDarkMode);
  const mode = darkMode ? "dark" : "light";
  const c = colorMap[color];

  return (
    <div
      className={`
        flex items-center gap-3 px-5 py-3 rounded-2xl border
        transition-colors duration-300
        ${c.bg[mode]} ${c.border[mode]}
        ${darkMode ? "bg-neutral-900/50" : "bg-white/80"}
      `}
    >
      {/* Icon */}
      <span className={`shrink-0 ${c.icon[mode]}`}>{icon}</span>

      {/* Text */}
      <div>
        <div className={`text-sm font-semibold ${c.title[mode]}`}>{title}</div>
        <div
          className={`text-xs ${
            darkMode ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
