// theme.ts
import { createTheme, VariantProps } from "@shopify/restyle";

const palette = {
  primary: {
    50: "#FFE5E5",
    100: "#FFB8B8",
    200: "#FF8A8A",
    300: "#FF5C5C",
    400: "#FF2E2E",
    500: "#ec0100", // MAIN BRAND COLOR
    600: "#C90000",
    700: "#A70000",
    800: "#850000",
    900: "#630000",
  },

  blue: {
    50: "#E9F4FF",
    100: "#CCE7FF",
    200: "#99D0FF",
    300: "#66B8FF",
    400: "#339FFF",
    500: "#0A84FF", // iOS/Google Focus Blue
    600: "#0069D9",
    700: "#0052B4",
    800: "#003C8E",
    900: "#002669",
  },
  red: {
    50: "#FFE5E5",
    100: "#FFB8B8",
    200: "#FF8A8A",
    300: "#FF5C5C",
    400: "#FF2E2E",
    500: "#ec0100",
    600: "#C90000",
    700: "#A70000",
    800: "#850000",
    900: "#630000",
  },
  gray: {
    50: "#F5F5F5",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0D0D0D",
  },

  secondary: "#B3B2BD",
  white: "#FFFFFF",
  black: "#000000",
};

const theme = createTheme({
  colors: {
    // ⭐ Primary Red Shades
    primary: palette.primary[500],
    primary50: palette.primary[50],
    primary100: palette.primary[100],
    primary200: palette.primary[200],
    primary300: palette.primary[300],
    primary400: palette.primary[400],
    primary500: palette.primary[500],
    primary600: palette.primary[600],
    primary700: palette.primary[700],
    primary800: palette.primary[800],
    primary900: palette.primary[900],

    // ⭐ Blue Shades (for focus states, info, links)
    blue: palette.blue[500],
    blue50: palette.blue[50],
    blue100: palette.blue[100],
    blue200: palette.blue[200],
    blue300: palette.blue[300],
    blue400: palette.blue[400],
    blue500: palette.blue[500],
    blue600: palette.blue[600],
    blue700: palette.blue[700],
    blue800: palette.blue[800],
    blue900: palette.blue[900],

    red: palette.red[500],
    red50: palette.red[50],
    red100: palette.red[100],
    red200: palette.red[200],
    red300: palette.red[300],
    red400: palette.red[400],
    red500: palette.red[500],
    red600: palette.red[600],
    red700: palette.red[700],
    red800: palette.red[800],
    red900: palette.red[900],

    gray: palette.gray[50],
    gray50: palette.gray[50],
    gray100: palette.gray[100],
    gray200: palette.gray[200],
    gray300: palette.gray[300],
    gray400: palette.gray[400],
    gray500: palette.gray[500],
    gray600: palette.gray[600],
    gray700: palette.gray[700],
    gray800: palette.gray[800],
    gray900: palette.gray[900],

    // Others
    secondary: palette.secondary,
    white: palette.white,
    black: palette.black,
    text: palette.black,
    background: palette.white,
    primaryText: palette.black,
    secondaryText: palette.secondary,
    cardBackground: palette.white,
    border: "#E5E5E5",
    transparent: "transparent",
    error: palette.red[500],
  },

  spacing: {
    none: 0,
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    "2xl": 32,
    "3xl": 40,
    "4xl": 48,
    "5xl": 56,
    "6xl": 64,
    "7xl": 72,
    "8xl": 80,
    "9xl": 88,
    "10xl": 96,
  },

  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },

  textVariants: {
    defaults: {
      fontSize: 16,
      fontWeight: "700",
      color: "primaryText",
    },
    header: {
      fontSize: 24,
      fontWeight: "700",
      color: "primaryText",
    },
    body: {
      fontSize: 16,
      color: "primaryText",
    },
    subtle: {
      fontSize: 14,
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      color: "white",
      textAlign: "center",
    },
    ghost: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: "primary",
    },
  },

  buttonVariants: {
    defaults: {
      backgroundColor: "primary",
      padding: "m",
      borderRadius: "m",
    },
    primary: {
      backgroundColor: "primary",
      padding: "l",
      borderRadius: "m",
    },
    secondary: {
      backgroundColor: "secondary",
      padding: "l",
      borderRadius: "m",
    },
    ghost: {
      backgroundColor: "transparent",
      padding: "l",
      borderRadius: "m",
    },
  },
});

export type ButtonVariantProps = VariantProps<Theme, "buttonVariants">;

export type Theme = typeof theme;
export default theme;
