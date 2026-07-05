import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeButton() {
  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-purple-600 text-white"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeButton;