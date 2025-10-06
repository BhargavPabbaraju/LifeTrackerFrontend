import { createTheme } from "@mui/material/styles";

const lightColors = {
  primary: "#4C662B",
  onPrimary: "#FFFFFF",
  primaryContainer: "#CDEDA3",
  onPrimaryContainer: "#354E16",
  secondary: "#586249",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#DCE7C8",
  onSecondaryContainer: "#404A33",
  tertiary: "#386663",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#BCECE7",
  onTertiaryContainer: "#1F4E4B",
  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#93000A",
  background: "#F9FAEF",
  onBackground: "#1A1C16",
  surface: "#F9FAEF",
  onSurface: "#1A1C16",
  surfaceVariant: "#E1E4D5",
  onSurfaceVariant: "#44483D",
  outline: "#75796C",
  outlineVariant: "#C5C8BA",
  shadow: "#000000",
  scrim: "#000000",
  inverseSurface: "#2F312A",
  inverseOnSurface: "#F1F2E6",
  inversePrimary: "#B1D18A",
};

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    ...lightColors,
    primary: {
      main: lightColors.primary,
      contrastText: lightColors.onPrimary,
      container: lightColors.primaryContainer,
      onContainer: lightColors.onPrimaryContainer,
    },
    secondary: {
      main: lightColors.secondary,
      contrastText: lightColors.onSecondary,
      container: lightColors.secondaryContainer,
      onContainer: lightColors.onSecondaryContainer,
    },
    background: {
      default: lightColors.background,
      paper: lightColors.surface,
    },
    text: {
      primary: lightColors.onSurface,
      secondary: lightColors.onSurfaceVariant,
    },
    error: {
      main: lightColors.error,
      contrastText: lightColors.onError,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default theme;
