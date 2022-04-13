import React from "react";
import { isolateComponent } from "isolate-react";
import Team from "./Team";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Team /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Team />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

});
