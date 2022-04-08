import React, { useEffect } from "react";
import { func, object } from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home"
import Login from "./Login"
import AuthLoading from "./AuthLoading";
import NotFoundPage from "./NotFoundPage";

import { userRoles } from "../constants";
import { getCurrentUser } from "../actions";
import { isBlank } from "../utils/helpers";

const ContentPanel = ({ userInfo, getCurrentUser }) => {

  useEffect( () => {
    getCurrentUser();
  }, [userInfo.id]);

  const isClient = userInfo.roles.indexOf(userRoles.CLIENT) > -1;
  const isAdmin = userInfo.roles.indexOf(userRoles.ADMIN) > -1;
  const isLoading = (!isClient && !isAdmin && isBlank(userInfo.id));

  return (
    <div id="content-panel">
      <Switch>
        { (isClient) && <Route exact={true} path="/" component={Home} /> }
        { (isAdmin) && <Route exact={true} path="/" component={NotFoundPage} /> }
        { (isLoading) && <Route exact={true} path="/" component={AuthLoading} />}
        {/* <Route component={Login} /> */}
        <Route component={Home} />
      </Switch>
    </div>
  );
};

ContentPanel.propTypes = {
  userInfo: object,
  getCurrentUser: func.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.currentUser,
});

export default connect(
  mapStateToProps,
  { // dispatch fns
    getCurrentUser,
  }
)(ContentPanel);
