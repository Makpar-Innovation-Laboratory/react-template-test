import React from "react";
import { isolateComponent } from "isolate-react";
import Mission from "./Mission";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Mission /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Mission />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

});
