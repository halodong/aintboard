import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
      white: string;
      black: string;
      lightGray: string;
      dark: string;
      lightYellow: string;
      darkGreen: string;
      darkerGreen: string;
      lightGreen: string;
      lighterGreen: string;
      mediumGreen: string;
      mediumRed: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    fonts: {
      rubikReg: string;
      rubikBold: string;
      rubikLight: string;
      quicksandReg: string;
      quicksandBold: string;
      quicksandLight: string;
      gameFont: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xl2: string;
      xxl: string;
    };
    border: {
      "10px": string;
    };
    spacing: {
      "50px": string;
      md: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    lightGray: "#AFA5A5",
    dark: "#353535",
    lightYellow: "#FAFAEB",
    darkGreen: "#234C4C",
    darkerGreen: "#2b4040", //participate box
    lightGreen: "#8FBC8E",
    lighterGreen: "#A6D5AE",
    mediumGreen: "#76AAA4",
    mediumRed: "#BB6B6B",
  },
  breakpoints: {
    xs: "360px",
    sm: "600px",
    md: "992px",
    lg: "1200px",
  },
  fonts: {
    rubikReg: "Rubik-Regular",
    rubikBold: "Rubik-Bold",
    rubikLight: "Rubik-Light",
    quicksandReg: "Quicksand-Regular",
    quicksandBold: "Quicksand-Bold",
    quicksandLight: "Quicksand-Light",
    gameFont: "PressStart",
  },
  fontSizes: {
    xs: "0.75rem", //12px
    sm: "0.875rem", //14px
    md: "1rem", //16px
    lg: "1.125rem", //18px
    xl: "1.25rem", //20px
    xl2: "1.5rem", //24px
    xxl: "2.25rem", //36px
  },
  border: {
    "10px": "0.625rem",
  },
  spacing: {
    "50px": "3.125rem",
    md: "1.5rem",
  },
};
