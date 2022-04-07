import React from "react";
import { shallow } from "enzyme";
import Root from "./Root";

describe("JSX Tests :: <Root /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const props = ({
      store: {
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: jest.fn(),
      },
      history: {}
    });
    const wrapper = shallow(<Root {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
