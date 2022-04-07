import React from "react";

const AuthLoading = () => {

  return (
    <div id="auth-loading-container">
      <div id="message">
        Please wait, your user account is currently being authenticated.
      </div>
      <div id="loader-container">
        <div className="loader" id="loader-left" />
        &nbsp;
        <div className="loader" id="loader-right" />
        &nbsp;
      </div>
    </div>
  );
};

export default AuthLoading;
