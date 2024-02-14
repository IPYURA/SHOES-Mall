import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { mainTheme } from "./theme";
import { ScrollToTop } from "./util";

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Noto Sans KR', sans-serif;
}
ul,li {
  list-style:none;
}
a {
  text-decoration:none;
  color:inherit;
}
button {
  cursor:pointer;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
