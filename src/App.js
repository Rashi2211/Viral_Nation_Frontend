import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { lightTheme, darkTheme } from "./components/theme";
import CardLayout from "./components/cardsMovies/cardsLayout";
import React, { useState } from "react";
import Navbar from "./components/navbar";

function App() {
  // State to manage the selected theme (light/dark)
  const [useLightTheme, setUseLightTheme] = useState(true);
  const selectedTheme = useLightTheme ? lightTheme : darkTheme; // Determining the selected theme based on the state
  const [layout, setLayout] = useState("grid"); // State to manage the layout mode (grid/table)
  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setUseLightTheme((prevTheme) => !prevTheme);
  };

  return (
    // Wrapping the entire app with the selected theme
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline /> {/* Apply baseline CSS */}
      <div>
        {/* Navbar component with theme toggle */}
        <Navbar toggleTheme={toggleTheme} useLightTheme={useLightTheme} />
        <main>
          <Routes>
            {/* Routing for the main content */}
            <Route
              path="/"
              element={<CardLayout layout={layout} setLayout={setLayout} />}
            />{" "}
          </Routes>
        </main>
        <footer></footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
