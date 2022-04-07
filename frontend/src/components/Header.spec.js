import React from "react";
import { isolateComponent } from "isolate-react";
import Header from "./Header";

describe("JSX Tests :: <Header /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Header />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  test("Explanation Banner Shows When Toggled", () => {
    const wrapper = isolateComponent(<Header />);
    const toggleBtn = wrapper.findOne("#explanation-btn");
    const explanation = wrapper.findAll("#gov-banner");

    expect(explanation.length).toEqual(0);

    toggleBtn.props.onClick();
    const explanationAfter = wrapper.findAll("#gov-banner");

    expect(explanationAfter.length).toEqual(1);
  });
});
