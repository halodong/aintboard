import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
      white: string;
      black: string;
      inputDark: string;
      lightGray: string;
      dark: string;
      lightYellow: string;
      darkGreen: string;
      darkerGreen: string;
      lightGreen: string;
      lighterGreen: string;
      mediumGreen: string;
      mediumRed: string;
      paleGray: string;
      errorRed: string;
      paleGolden: string;
      darkBrown: string;
      peru: string;
      sandyBrown: string;
      slateGray: string;
      rosyBrown: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      sm2: string;
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
      md2: string;
      lg: string;
    };
    zIndex: {
      [key: string]: number;
      "1st": number;
      "2nd": number;
      "3rd": number;
      "4th": number;
      "5th": number;
      "6th": number;
      "7th": number;
      "8th": number;
      "9th": number;
      "10th": number;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    inputDark: "#2B2B2B",
    lightGray: "#AFA5A5",
    paleGray: "#CECECE",
    dark: "#353535",
    lightYellow: "#FAFAEB",
    darkGreen: "#234C4C",
    darkerGreen: "#2b4040", //participate box
    lightGreen: "#8FBC8E",
    lighterGreen: "#A6D5AE",
    mediumGreen: "#76AAA4",
    mediumRed: "#BB6B6B",
    errorRed: "#E15A5A",
    paleGolden: "#f1dca7",
    darkBrown: "#997b65",
    peru: "#b58463",
    sandyBrown: "#e8ac65",
    slateGray: "#727f84",
    rosyBrown: "#baa587",
  },
  breakpoints: {
    xs: "360px",
    sm: "600px",
    sm2: "782px",
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
    md2: "2rem",
    lg: "3.5rem",
  },
  zIndex: {
    "1st": 999999999, //toast
    "2nd": 9999999, //search input menu portal - used in searchbar and modals
    "3rd": 999999, //.ReactModalPortal, NavBar .MenuIcon, Modal content
    "4th": 99999, //Sidebar SidebarContainer
    "5th": 99998, //Sidebar OverlaySidebar
    "6th": 9999, //Navbar NavbarContainer
    "7th": 10, //ReviewHomepage ReviewContainer, ReviewHomepage ReviewCardWrapper
    "8th": 5, //Header baseTaglineStyles
    "9th": 1, //Header tent, Input .search-icon
    "10th": 0, //Input InputStyled, Header trees
  },
};
