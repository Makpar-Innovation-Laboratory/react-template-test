/* eslint-disable import/no-named-as-default */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Header from "./Header";
import ContentPanel from "./ContentPanel";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div id="main-app-container">
        <Header />
        <ContentPanel />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
