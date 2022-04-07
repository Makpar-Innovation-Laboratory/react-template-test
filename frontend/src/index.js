/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore, { history } from "./store/configureStore";
import Root from "./components/Root";
// Yep, that's right. You can import SASS/CSS files too!
// Webpack will run the associated loader and plug this into the page.
import "./styles/styles.scss";
/* istanbul ignore next */
require("./favicon.ico"); // Tell webpack to load favicon.ico
/* istanbul ignore next */
const store = configureStore();

/* istanbul ignore next */
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("app")
);

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}

