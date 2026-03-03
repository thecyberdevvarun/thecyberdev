"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../redux/slices/themeSlice";
import Navbar from "../components/Navbar";

export default function Home() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  return (
    <main>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => dispatch(toggleDarkMode())}
      />
    </main>
  );
}
