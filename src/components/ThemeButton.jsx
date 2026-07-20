import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeButton() {
  const theme = useContext(ThemeContext);

  // Agar Context properly provide nahi hua toh gracefully handle karein
  if (!theme) {
    console.error("ThemeButton must be used within a ThemeProvider");
    return null;
  }

  const { darkMode, setDarkMode } = theme;

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:scale-105 transition-all cursor-pointer"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeButton;