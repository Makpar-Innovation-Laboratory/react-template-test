import React from 'react';
// import { Context } from "../../App";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();

    return (
        <div className="d-flex flex-column">
            {/* Main header */}
            <div className="nav-container background-light d-flex justify-content-between align-items-center py-4">
                <div className="nav-header px-5">
                    <h1 className="color-dark">LOGO</h1>
                </div>

                <div className="px-5">
                    <a className=" color-dark">
                        <h5 className="color-dark logout">Sign out</h5>
                    </a>
                </div>
            </div>

            {/* Navigation */}
            <div className="navigation-items d-flex justify-content-center align-items-center background-dark">
                <a>
                    <div
                        className="navigation-item-white color-white"
                        id={location.pathname == "/" ? "active-white" : ""}
                    >
                        <Link to="/" className="color-white">
                            <h5 className="color-white">Home</h5>
                        </Link>
                    </div>
                </a>
                <a>
                    <div
                        className="navigation-item-white color-white"
                        // id={location.pathname == "/laborCategory" ? "active-white" : ""}
                    >
                        <Link to="/ToolOne" className="color-white">
                            <h5 className="color-white">Tool 1 (Pie Chart)</h5>
                        </Link>
                    </div>
                </a>
                <a>
                    <div
                        className="navigation-item-white color-white"
                        // id={location.pathname == "/scheduleManagement" ? "active-white" : ""}
                    >
                        <Link to="/ToolTwo" className="color-white">
                            <h5 className="color-white">Tool 2 (Area Chart)</h5>
                        </Link>
                    </div>
                </a>
                <a>
                    <div
                        className="navigation-item-white color-white"
                        // id={location.pathname == "/scheduleManagement" ? "active-white" : ""}
                    >
                        <Link to="/ToolThree" className="color-white">
                            <h5 className="color-white">Tool 3 (2 step)</h5>
                        </Link>
                    </div>
                </a>
                <a>
                    <div
                        className="navigation-item-white color-white"
                        // id={location.pathname == "/scheduleManagement" ? "active-white" : ""}
                    >
                        <Link to="/ToolFour" className="color-white">
                            <h5 className="color-white">Tool 4 (Single page)</h5>
                        </Link>
                    </div>
                </a>
            </div>
        </div>
    )
}