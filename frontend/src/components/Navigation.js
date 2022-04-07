import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [menuExpanded, expandMenu] = useState(false);
  const activeClass = "active-style-navigation";

  return (
    <div className="navigation-container">
      <div id="menu-icon" onClick={() => expandMenu(!menuExpanded)}>&#9776;</div>
      {menuExpanded &&
        <ul id="drop-down-menu" className="usa-sidenav" >
          <li className="usa-sidenav__item" >
            <NavLink id="home-nav-link" exact={true} to="/" activeClassName={activeClass} onClick={() => expandMenu(false)}>Home</NavLink>
          </li>
          <li className="usa-sidenav__item" >
            <NavLink id="application-nav-link" to="/form" activeClassName={activeClass} onClick={() => expandMenu(false)}>Application Form</NavLink>
          </li>
        </ul>
      }
    </div>
  );
};


export default Navigation;
