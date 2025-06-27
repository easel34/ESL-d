import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Constants to avoid typos
const MODE = {
  DARK: "dark",
  LIGHT: "light",
};

// Color token generator based on mode
const generateColorTokens = (mode) => ({
  grey: {
    100: mode === MODE.DARK ? "#e0e0e0" : "#141414",
    200: mode === MODE.DARK ? "#c2c2c2" : "#292929",
    300: mode === MODE.DARK ? "#a3a3a3" : "#3d3d3d",
    400: mode === MODE.DARK ? "#858585" : "#525252",
    500: mode === MODE.DARK ? "#666666" : "#666666",
    600: mode === MODE.DARK ? "#525252" : "#858585",
    700: mode === MODE.DARK ? "#3d3d3d" : "#a3a3a3",
    800: mode === MODE.DARK ? "#292929" : "#c2c2c2",
    900: mode === MODE.DARK ? "#141414" : "#e0e0e0",
  },
  primary: {
    100: mode === MODE.DARK ? "#d0d1d5" : "#040509",
    200: mode === MODE.DARK ? "#a1a4ab" : "#080b12",
    300: mode === MODE.DARK ? "#727681" : "#0c101b",
    400: mode === MODE.DARK ? "#1F2A40" : "#f2f0f0",
    500: mode === MODE.DARK ? "#141b2d" : "#141b2d",
    600: mode === MODE.DARK ? "#101624" : "#1F2A40",
    700: mode === MODE.DARK ? "#0c101b" : "#727681",
    800: mode === MODE.DARK ? "#080b12" : "#a1a4ab",
    900: mode === MODE.DARK ? "#040509" : "#d0d1d5",
  },
  yellowAccent: {
    100: "#fffde7",
    200: "#fff9c4",
    300: "#fff59d",
    400: "#fff176",
    500: "#ffee58",
    600: "#fdd835",
    700: "#fbc02d",
    800: "#f9a825",
    900: "#f57f17",
  },
  greenAccent: {
    100: mode === MODE.DARK ? "#dbf5ee" : "#0f2922",
    200: mode === MODE.DARK ? "#b7ebde" : "#1e5245",
    300: mode === MODE.DARK ? "#94e2cd" : "#2e7c67",
    400: mode === MODE.DARK ? "#70d8bd" : "#3da58a",
    500: mode === MODE.DARK ? "#4cceac" : "#4cceac",
    600: mode === MODE.DARK ? "#3da58a" : "#70d8bd",
    700: mode === MODE.DARK ? "#2e7c67" : "#94e2cd",
    800: mode === MODE.DARK ? "#1e5245" : "#b7ebde",
    900: mode === MODE.DARK ? "#0f2922" : "#dbf5ee",
  },
  redAccent: {
    100: mode === MODE.DARK ? "#f8dcdb" : "#2c100f",
    200: mode === MODE.DARK ? "#f1b9b7" : "#58201e",
    300: mode === MODE.DARK ? "#e99592" : "#832f2c",
    400: mode === MODE.DARK ? "#e2726e" : "#af3f3b",
    500: mode === MODE.DARK ? "#db4f4a" : "#db4f4a",
    600: mode === MODE.DARK ? "#af3f3b" : "#e2726e",
    700: mode === MODE.DARK ? "#832f2c" : "#e99592",
    800: mode === MODE.DARK ? "#58201e" : "#f1b9b7",
    900: mode === MODE.DARK ? "#2c100f" : "#f8dcdb",
  },
  blueAccent: {
    100: mode === MODE.DARK ? "#e1e2fe" : "#151632",
    200: mode === MODE.DARK ? "#c3c6fd" : "#2a2d64",
    300: mode === MODE.DARK ? "#a4a9fc" : "#3e4396",
    400: mode === MODE.DARK ? "#868dfb" : "#535ac8",
    500: mode === MODE.DARK ? "#6870fa" : "#6870fa",
    600: mode === MODE.DARK ? "#535ac8" : "#868dfb",
    700: mode === MODE.DARK ? "#3e4396" : "#a4a9fc",
    800: mode === MODE.DARK ? "#2a2d64" : "#c3c6fd",
    900: mode === MODE.DARK ? "#151632" : "#e1e2fe",
  },
});

// MUI theme configuration
export const themeSettings = (mode) => {
  const colors = generateColorTokens(mode);

  return {
    palette: {
      mode,
      ...(mode === MODE.DARK
        ? {
            primary: { main: colors.primary[500] },
            secondary: { main: colors.greenAccent[500] },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
              paper: colors.primary[400],
            },
          }
        : {
            primary: { main: colors.primary[100] },
            secondary: { main: colors.greenAccent[500] },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
              paper: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: '"Source Sans Pro", sans-serif',
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  };
};

// Theme context
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  currentMode: MODE.DARK,
});

// Custom hook with persistence
export const useMode = () => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("colorMode");
    return saved && [MODE.DARK, MODE.LIGHT].includes(saved) ? saved : MODE.DARK;
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === MODE.LIGHT ? MODE.DARK : MODE.LIGHT;
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
      currentMode: mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

// ✅ Export tokens for external use (like in StatBox or Topbar)
export const tokens = generateColorTokens;
