"use client";

import { useSelector } from "react-redux";
import { selectDarkMode } from "../../redux/features/theme/themeSlice.js";

export default function DashboardPage() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div>
      <h1
        className={`text-2xl sm:text-3xl font-bold ${
          darkMode ? "text-white" : "text-neutral-900"
        }`}
      >
        Dashboard
      </h1>
      <p
        className={`mt-2 ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
      >
        Welcome back, John! 👋
      </p>
    </div>
  );
}
