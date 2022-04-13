import React from "react";
import { isolateComponent } from "isolate-react";
import Login from "./Login";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Header /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Login />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

});
