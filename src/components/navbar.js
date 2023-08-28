import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

function Navbar({ toggleTheme, useLightTheme }) {
  // Determining the selected theme based on useLightTheme state
  const selectedTheme = useLightTheme ? lightTheme : darkTheme;

  return (
    // Wrapping the entire Navbar in the selected theme's ThemeProvider
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline /> {/* Apply baseline styles based on the selected theme */}
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar for the navigation */}
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            {/* Title of the application */}
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {/* Link to the home page */}
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Viral Nation
              </Link>
            </Typography>
            {/* Toggle theme button */}
            <Box sx={{ display: { xs: "block", md: "block" } }}>
              <IconButton onClick={toggleTheme}>
                {/* Display dark mode icon if using light theme, and vice versa */}
                {useLightTheme ? (
                  <DarkModeRoundedIcon />
                ) : (
                  <LightModeRoundedIcon />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
