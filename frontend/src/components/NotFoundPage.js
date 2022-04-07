import React from "react";
import { history } from "../store/configureStore";

const NotFoundPage = () => {
  return (
    <div id="404-page-container">
      <h4>
        404 Page Not Found
      </h4>
      <button
        id="home-button"
        className="usa-button"
        aria-label="Click to return to Home Screen"
        value="Go Back To Home Page"
        onClick={() => history.push("/")}
      >
        Go Back To Home Page
      </button>
    </div>
  );
};

export default NotFoundPage;
