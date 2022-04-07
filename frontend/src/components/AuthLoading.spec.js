import React from "react";
import { shallow } from "enzyme";
import AuthLoading from "./AuthLoading";

describe("JSX Tests :: <AuthLoading /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {

    const wrapper = shallow(<AuthLoading />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
