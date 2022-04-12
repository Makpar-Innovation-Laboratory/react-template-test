import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Team() {
  const members = [
    { name: "Nickolas Sibley", position: "Agile Coach" },
    { name: "Peter Cofrancesco", position: "Innovation Engineer" },
    { name: "Grant Moore", position: "DevSecOps" },
    { name: "Selah Konur", position: "Innovation Lab Technical Specialist" },
    { name: "Aurora Pariseau", position: "Full Stack Developer" },
    { name: "Thomas Klock", position: "Full Stack Developer" },
    { name: "Phung Ngo", position: "UX/Front End Developer" },
  ]

  return (
    <div className="team-container" style={{ padding: "3rem 0 15rem 0" }}>
      <div
        style={{ display: "flex", justifyContent: "center", width: "80%" }}
        className="white-text team-header"
      >
        <div style={{ width: "20%", textAlign: "right" }}>
          <h4 className="mat-headline mr-2">TEAM</h4>
        </div>

        <div style={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h5 className="mat-title">LOREM IPSUM DOLOR SIT AMET</h5>
          <div className="team-header-border"></div>
          <p className="mat-subheading-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor
            incididunt.
          </p>
        </div>
      </div>

      <div
        className="row-wrapper"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          className="row"
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10rem",
            flexWrap: "wrap" }}
        >
          {(members)?
            members.map((i, idx) => {
              return (
                <div
                  key={idx}
                  // *ngFor="let member of row"
                  style={{
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "30%",
                    marginTop: "4rem"
                  }}
                >
                  <img src="../../assets/icon/user-icon.svg" height="250px" />
                  <h5 className="mat-title white-text" style={{ marginTop: "1rem" }}>
                    {/* {{member.name.toUpperCase()}} */}
                    {i.name}
                  </h5>
                  <h5
                    className="mat-title white-text"
                    style={{ borderBottom: "2px dashed #ffffff", paddingBottom: "0.5rem" }}
                  >
                    {/* {{member.position}} */}
                    {i.position}
                  </h5>

                  {/* <div
                    className="bg-primary"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "17rem",
                      transform: "translateY(125px)"
                    }}
                  ></div> */}
                </div>
              );
            })
            : null
          }
        </div>
      </div>
    </div>
  );
}
