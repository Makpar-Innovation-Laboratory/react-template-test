import React, { useState } from "react";

export default function Projects() {

  const projects = [
    {
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tags: ["Tag 1", "Tag 2"],
      year: 2022
    },
    {
      title: "Project 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tags: ["Tag 1", "Tag 2"],
      year: 2021
    },
    {
      title: "Project 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      year: 2020
    },
  ]

  return (
    <div className="projects-container" style={{ padding: "3rem 0 0 0" }}>
      <div
        className="white-text projects-header"
      >
        <div style={{ width: "20%", textAlign: "right" }}>
          <h3 className="mr-2">PROJECTS</h3>
        </div>

        <div style={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h5 className="mat-title">LOREM IPSUM DOLOR SIT AMET</h5>
          <div className="header-border"></div>
          <p className="mat-subheading-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      <div className="projects-wrapper">
        <div className="projects">
          { projects ? projects.map((project, pid) => {
            return (
              <div key={pid} style={{display: "flex"}}>
                <div className="ml-2">
                  <h4 className="mat-headline white-text" style={{ margin: "2rem 2rem 0 0" }}>
                    { project.year }
                  </h4>
                </div>

                <div
                  className="preview bg-white primary-text"
                  // style={{height: "18rem", overflow: "hidden"}}
                >
                  <div className="preview-image bg-primary" style={{height: "100%"}}>
                    {/* <img src="../../../assets/preview.png" width="100%"/> */}
                  </div>
                  <div className="preview-info">
                    {/* <a routerlink="/project"> */}
                    <a>
                      <h4>{project.title}</h4>
                    </a>
                    <p className="my-1">{project.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      { project.tags ? project.tags.map((tag, tid) => {
                        return (
                          <button key={tid} className="project-tag">
                              {tag}
                          </button>
                        )
                      }) : null }

                    </div>
                  </div>
                </div>
              </div>
            )
          }) : "No projects available"
        }

        </div>
      </div>
    </div>
  );
}
