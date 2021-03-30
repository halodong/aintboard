import "./../fonts/fonts.css";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "~/styles/theme";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: ${theme.fonts.rubikReg}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 500ms ease-in-out;
  }

  .ReactModal__Overlay--after-open{
      opacity: 1;
  }

  .ReactModal__Overlay--before-close{
      opacity: 0;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
