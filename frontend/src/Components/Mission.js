import React, { useState } from "react";
import UpliftCommunity from "../assets/icon/uplift-community.png";
import CalmExecution from "../assets/icon/calm-execution.png";
import CustomerDelight from "../assets/icon/customer-delight.png";
import OnIt from "../assets/icon/on-it.png";

export default function Mission() {
  return (
    <div className="mission-container" style={{ padding: "3rem 0" }}>
      <div
        style={{ display: "flex", justifyContent: "center", width: "80%" }}
        className="white-text mission-header"
      >
        <div style={{ width: "20%", textAlign: "right" }}>
          <h4 className="mat-headline mr-2">MISSION</h4>
        </div>

        <div style={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h5 className="mat-title">OUR VALUES</h5>
          <div className="mission-header-border"></div>
          <p className="mat-subheading-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor
            incididunt.
          </p>
        </div>
      </div>

      <div style={{ width: "90%", display: "flex", justifyContent: "space-around" }}>
        <div className="mission-card primary-text">
          <img src={UpliftCommunity} height="180px" />
          <h5 className="mat-headline text-primary">UPLIFT OUR<br></br>COMMUNITIES</h5>
          <p className="mat-title text-primary">
            We prioritize staying engaged with our clients, our colleagues,
            our work, and our communities.
          </p>
        </div>

        <div className="mission-card primary-text">
          <img src={OnIt} height="180px" />
          <h5 className="mat-headline text-primary">ON IT!</h5>
          <p className="mat-title text-primary">
            We are enthusiastic about delivering high quality work, making a
            difference, quick to find solutions to problems, eager to step up
            to the challenge; in short: a great attitude.
          </p>
        </div>

        <div className="mission-card primary-text">
          <img src={CustomerDelight} height="180px" />
          <h5 className="mat-headline text-primary">CUSTOMER<br></br> DELIGHT</h5>
          <p className="mat-title text-primary">
            We prioritize excellence in our service output, always thinking
            ahead to anticipate client needs, building trust with our clients
            overtime through delivering value, and staying on top of making our
            clients' lives easier.
          </p>
        </div>

        <div className="mission-card primary-text">
          <img src={CalmExecution} height="180px" />
          <h5 className="mat-headline text-primary">CALM<br></br> EXECUTION</h5>
          <p className="mat-title text-primary">
            Under heat, we keep a calm composure – because if we stay calm, our
            clients and our teams can remain calm. Even when the pressure is on,
            calm minds can achieve anything they put their minds to. Calm is the
            magic elixir to our success and harmony.
          </p>
        </div>
      </div>
    </div>
  );
}
