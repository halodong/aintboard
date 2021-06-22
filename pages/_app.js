import { Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

import store from "redux/store";
import { Toast } from "components/Common/Toast";

import "./../fonts/fonts.css";
import "nprogress/nprogress.css";
import { theme } from "styles/theme";

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

  h1 {
    margin: 0;
    margin-block-end: 0;
    margin-block-start: 0;
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
      background: rgba(0, 0, 0, 0.5) !important;
  }

  .ReactModal__Overlay--before-close{
      opacity: 0;
  }

  .ReactModal__Body--open {
    position: static;
    overflow-y: scroll;
  }

  .ReactModal__Html--open {
    overflow-y: hidden;
  }

  .ReactModalPortal {
    position: fixed;
    z-index: ${theme.zIndex["3rd"]} !important;
    height: 1px; //height and width are needed for tabbing in modal
    width: 1px;
  }

  .react-datepicker {
    font-size: 1rem;
  }

  .react-datepicker__month {
    margin: 0.4rem 1rem;
  }

  .react-datepicker__header {
    background-color: ${theme.colors.darkerGreen};

    div {
      color: white;
    }
  }

  .react-datepicker__day-name, .react-datepicker__day {
    width: 1.9rem;
    line-height: 1.9rem;
    margin: 0.166rem;
  }

  .react-datepicker__header .react-datepicker__day-name {
    font-size: 0.8rem;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.4rem;
    line-height: 1.5rem;
  }

  .react-datepicker__month .react-datepicker__day--outside-month {
    background-color: ${theme.colors.paleGray};
  }

  .react-datepicker__month .react-datepicker__day--selected {
    background-color: ${theme.colors.darkerGreen};
  }

  .react-datepicker__current-month {
    font-size: 1rem;
  }

  #nprogress .bar {
    background: ${theme.colors.lightGreen} !important;
  }
`;

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toast />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
