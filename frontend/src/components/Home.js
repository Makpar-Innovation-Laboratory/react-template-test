import React from "react";
import { Link } from "react-router-dom";

export default function Home () {

  return (
    <div className="home-container">
      <div className="heading-container">
        <div style={{ margin: "30px", width: "50%" }}>
          <div className="white-text mat-display-2 mb-1">INNOVATION LAB</div>
          <div className="white-text mat-headline">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT</div>
        </div>

        <div>
          <div className="flex-column">
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/" className="white-text link">MISSION</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/" className="white-text link">TEAM</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/" className="white-text link">PROJECTS</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/" className="white-text link">ARCHIVE</Link>
            </div>
          </div>
          <div id="open-left-white" style={{ height: "0.5rem", width: "18rem" }}></div>
        </div>
      </div>

      <div className="{classes.whitediv} services-container">
        <div className="card">
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", paddingLeft: "50px", marginTop: "15px" }}>
              <div className="primary-text mat-headline text-left">SERVICES</div>
              <img
                className="right-arrow mat-headline"
                src="../assets/icon/right_arrow_icon.svg"
                style={{ marginLeft: "30px" }}
              />
            </div>

            <div id="open-left" style={{ height: "0.5rem", width: "8rem" }}></div>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <ul className="primary-text" style={{ width: "100%" }}>
              <div className="selected service-selector">
                <div className="mat-headline">CYBERSECURITY</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector">
                <div className="mat-headline">MACHINE LEARNING</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector">
                <div className="mat-headline">CLOUD MIGRATION</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector">
                <div className="mat-headline">DEVSECOPS</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector">
                <div className="mat-headline">AGILE</div>
                <div id="hr-line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
            </ul>
          </div>
        </div>

        <div className="card primary-container"  style={{ margin: 0, width: "50%", height: "100%" }}>
          <div style={{ margin: "50px 40px", padding: "5rem 0" }}>
            <div className="mat-headline white-text text-center mb-1">
              CYBERSECURITY
            </div>

            <div className="mat-title white-text text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam. Consectetur adipiscing elit, sed do eiusmod
              tempor incididunt.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
