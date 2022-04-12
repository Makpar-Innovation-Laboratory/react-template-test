import React, { useState } from "react";

export default function Projects() {
  return (
    <div className="projects-container" style={{ padding: "3rem 0 15rem 0" }}>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="text-white projects-header"
      >
        <div style={{ width: "20%", textAlign: "right" }}>
          <h4 className="mat-headline" style={{ marginRight: "2rem" }}>PROJECTS</h4>
        </div>

        <div style={{ width: "75%" }}>
          <h5 className="mat-title">LOREM IPSUM DOLOR SIT AMET</h5>
          <div className="projects-header-border"></div>
          <h6 className="mat-subheading-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </h6>
        </div>
      </div>

      <div className="projects-wrapper">
        <div className="projects-year">
          <div style={{ height: "25%" }}>
            <h4 className="mat-headline text-white" style={{ margin: "2rem 2rem 0 0" }}>
              2022
            </h4>
          </div>

          <div>
            <h4 className="mat-headline text-white" style={{ margin: "2rem 2rem 0 0" }}>
              2021
            </h4>
          </div>
        </div>

        <div className="projects">
          <div
            // *ngFor="let project of projects"
            className="preview bg-white text-primary" style={{height: "18rem", overflow: "hidden"}}>
            <div className="preview-image" style={{height: "90%"}}>
              {/* <img src="../../../assets/preview.png" width="100%"/> */}
            </div>
            <div className="preview-info">
              <a routerLink="/project">
                <h5 className="mat-title">
                {/* {{project.title}} */}
                </h5>
              </a>
              <h6 className="mat-subheading-2">
                {/* {{project.description}} */}
              </h6>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <button
                  // *ngFor="let tag of project.tags"
                  className="project-tag">
                    {/* {{tag}} */}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
