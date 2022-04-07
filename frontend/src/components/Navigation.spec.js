import React from "react";
import { isolateComponent } from "isolate-react";
import Navigation from "./Navigation";
import { history } from "../store/configureStore";

describe("JSX Tests :: <Navigation /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Navigation />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  test("Drop-down Menu Shows When Toggled", () => {
    const wrapper = isolateComponent(<Navigation />);
    const toggleBtn = wrapper.findOne("#menu-icon");
    const dropDown = wrapper.findAll("#drop-down-menu");

    expect(dropDown.length).toEqual(0);

    toggleBtn.props.onClick();
    const dropDownAfter = wrapper.findAll("#drop-down-menu");

    expect(dropDownAfter.length).toEqual(1);
  });

  test("Home Navigation Menu Item Correctly Navigates To Home Page", () => {
    const props = ({ location: "/about"});
    const wrapper = isolateComponent(<Navigation {...props} />);
    const toggleBtn = wrapper.findOne("#menu-icon");
    toggleBtn.props.onClick();
    const homeNav = wrapper.findOne("#home-nav-link");
    homeNav.props.onClick();

    expect(history.location.pathname).toEqual("/");
  });

  xtest("Application Button Correctly Navigates To Form Page", () => {
    const props = ({ location: "/about"});
    const wrapper = isolateComponent(<Navigation {...props} />);
    const toggleBtn = wrapper.findOne("#menu-icon");
    toggleBtn.props.onClick();
    const formNav = wrapper.findOne("#application-nav-link");

    formNav.props.onClick();

    expect(history.location.pathname).toEqual("/form");
  });
});
