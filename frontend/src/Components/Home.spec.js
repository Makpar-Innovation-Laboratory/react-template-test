import React from "react";
import { isolateComponent } from "isolate-react";
import Home from "./Home";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Header /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Home />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  // test("Home Renders As Expected", () => {
  //   const wrapper = mount(<Home />);
  // });

});
