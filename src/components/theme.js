// theme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007bff", // Primary color
    },
    secondary: {
      main: "#6c757d", // Secondary color
    },
    background: {
      default: "#f8f9fa", // Background color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Font-family
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#007bff", // Primary color
    },
    secondary: {
      main: "#6c757d", // Secondary color
    },
    background: {
      default: "#121212", // Dark background color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Font-family
  },
});

export { lightTheme, darkTheme };
