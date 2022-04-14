import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home () {

  const [selected, setSelected] = useState("Cybersecurity");

  const services = [
    { name: "Cybersecurity", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
    { name: "Machine Learning", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Labore et dolore magna aliqua. Ut enim ad minim veniam. Sed do eiusmod tempor incididunt." },
    { name: "Cloud Migration", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
    { name: "DevSecOps", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
    { name: "Agile", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Sed do eiusmod tempor incididunt." },
  ]

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
              <Link to="/mission" className="white-text link">MISSION</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/team" className="white-text link">TEAM</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/projects" className="white-text link">PROJECTS</Link>
            </div>
            <div className="white-text mat-headline mb-1" style={{ marginRight: "50px", textAlign: "right" }}>
              <Link to="/archive" className="white-text link">ARCHIVE</Link>
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
            </div>

            <div id="open-left" style={{ height: "0.5rem", width: "8rem" }}></div>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <ul className="primary-text" style={{ width: "100%" }}>
              <div className="service-selector" id={ selected == "Cybersecurity" ? "selected" : "" }>
                <div className="mat-headline" onClick={(e) => setSelected("Cybersecurity")}>CYBERSECURITY</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector" id={ selected == "Machine Learning" ? "selected" : "" }>
                <div className="mat-headline" onClick={(e) => setSelected("Machine Learning")}>MACHINE LEARNING</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector" id={ selected == "Cloud Migration" ? "selected" : "" }>
                <div className="mat-headline" onClick={(e) => setSelected("Cloud Migration")}>CLOUD MIGRATION</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector" id={ selected == "DevSecOps" ? "selected" : "" }>
                <div className="mat-headline" onClick={(e) => setSelected("DevSecOps")}>DEVSECOPS</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
              <div className="service-selector" id={ selected == "Agile" ? "selected" : "" }>
                <div className="mat-headline" onClick={(e) => setSelected("Agile")}>AGILE</div>
                <div id="line" style={{ height: "1.5rem", width: "50%" }}></div>
              </div>
            </ul>
          </div>
        </div>

        <div className="card primary-container"  style={{ margin: 0, width: "50%", height: "100%" }}>

            { services ? services.map((service, sid) => {
              console.log(service.name + " == " + selected)
              if (service.name == selected) {
                return (
                  <div key={sid} style={{ margin: "50px 40px", padding: "5rem 0" }}>
                    <div className="mat-headline white-text text-center mb-1">
                      <h4>{service.name.toUpperCase()}</h4>
                    </div>

                    <div className="mat-title white-text text-center">
                      <h5 style={{ fontWeight: "normal" }}>{service.description}</h5>
                    </div>
                  </div>
                )
              }
            }) : ""}

        </div>
      </div>
    </div>
  )
}
