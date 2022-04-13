import React, { useState } from "react";

export default function Project() {

  const project = {
    title: "Project Title 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tags: ["Tag 1", "Tag 2"],
    year: "June 2022",
    duration: "4 months"
  };


  return (
    <div className="projects-container" style={{ padding: "3rem 0 0 0" }}>
      <div className="white-text projects-header">
        <div style={{ width: "25%", textAlign: "right", marginRight: "3rem" }}>
          {/* <h3 className="mr-2">{project.title}</h3> */}
          <h5>TABLE OF CONTENTS</h5>
          <div className="dashed-hr-white"></div>
          <a href="#tech" ><p style={{margin: "0.6rem 0"}}>TECHNOLOGIES</p></a>
          <a href="#agile" ><p>AGILE PROCESS</p></a>
        </div>

        <div style={{ width: "75%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="mr-2">{project.title}</h3>
            <h5 className="mat-title">Duration: {project.duration}</h5>
          </div>
          <div className="header-border"></div>
          <p className="mat-subheading-2">
            {project.description}
          </p>
          <div className="mt-1">
            { project.tags ? project.tags.map((tag, tid) => {
              return (
                <button className="btn-primary">{tag}</button>
              )
            }) : ""}
          </div>
        </div>
      </div>

      <div className="project-info">
        <div className="project-tech white-text" id="tech" style={{height: "500px"}}>
          <h4>TECHNOLOGIES</h4>
        </div>

        <div className="project-agile white-text" id="agile" style={{height: "500px"}}>
          <h4>AGILE PROCESS</h4>
        </div>
      </div>
    </div>
  );
}
