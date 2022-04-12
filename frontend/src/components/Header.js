import React, { useState }  from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  const [isExpanded, expandBanner] = useState(false);

  return (
    <div className="nav-bar">
      <h1>MAKPAR</h1>
      <nav className="nav-items">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/mission" className="nav-link">MISSION</Link>
        <Link to="/team" className="nav-link">TEAM</Link>
        <Link to="/projects" className="nav-link">PROJECTS</Link>
        <Link to="/post-archive" className="nav-link">ARCHIVE</Link>
        {/* <a routerLink="/home" class="nav-link">HOME</a>
        <a routerLink="/mission" class="nav-link">MISSION</a>
        <a routerLink="/" class="nav-link">TEAM</a>
        <a routerLink="/" class="nav-link">PROJECTS</a>
        <a routerLink="/" class="nav-link">POST ARCHIVE</a> */}
      </nav>
    </div>
  );

};
export default Header;
