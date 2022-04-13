import React, { useEffect } from "react";
import { func, object } from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import AuthLoading from "./AuthLoading";
import NotFoundPage from "./NotFoundPage";
import Mission from "./Mission";
import Team from "./Team";
import Projects from "./Projects";
import Archive from "./Archive";

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
        {/* { (isClient) && <Route exact={true} path="/" component={Home} /> }
        { (isAdmin) && <Route exact={true} path="/" component={NotFoundPage} /> }
        { (isLoading) && <Route exact={true} path="/" component={AuthLoading} />} */}
        {/* <Route path="/" component={Home} /> */}
        <Route path="/mission" component={Mission} />
        <Route path="/team" component={Team} />
        <Route path="/projects" component={Projects} />
        <Route path="/archive" component={Archive} />
        <Route path="/" component={Home} />
        {/* <Route component={Login} /> */}

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
