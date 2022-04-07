import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "./NotFoundPage";
import { isolateComponent } from "isolate-react";
import { history } from "../store/configureStore";

describe("JSX Tests :: <NotFoundPage /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {

    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test("Home Button Correctly Navigates To Adjudicator Home Page", () => {
    const props = ({ location: "/NotFoundPage"});
    const wrapper = isolateComponent(<NotFoundPage {...props} />);
    const homeBtn = wrapper.findOne("#home-button");

    homeBtn.props.onClick();

    expect(history.location.pathname).toEqual("/");
  });
});
