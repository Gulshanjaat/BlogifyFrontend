import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import BlogProvider from "./context/BlogContext";
import { Toaster } from "react-hot-toast";


import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

// import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
         <BlogProvider>
    <App />
      <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </BlogProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);