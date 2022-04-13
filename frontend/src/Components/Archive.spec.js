import React from "react";
import { isolateComponent } from "isolate-react";
import Archive from "./Archive";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Archive /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Archive />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

});
