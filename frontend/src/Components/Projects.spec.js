import React from "react";
import { isolateComponent } from "isolate-react";
import Projects from "./Projects";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Projects /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Projects />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

});
