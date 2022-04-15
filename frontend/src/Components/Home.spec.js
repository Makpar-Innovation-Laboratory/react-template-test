import React from "react";
import { isolateComponent } from "isolate-react";
import Home from "./Home";
// import { shallow, mount } from "enzyme";

describe("JSX Tests :: <Home /> Rendering", () => {

  test("Sanity Check Snapshot Rendering", () => {
    const wrapper = isolateComponent(<Home />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  // Navigation Test

  test("AdjudicatorHome Renders Without Crashing Before Case Data Is Available", () => {
    // const defaultState = getInitState({});
    // const mockStore = configureMockStore(middleware)(defaultState);
    const connectedWrapper = mount(
      <Provider>
        <Home />
      </Provider>
    );

    const mainContent = connectedWrapper.find(".home-container");
    // const casesList = mainContent.find(CasesInProgress);
    // const casesListContainer = casesList.find("#cases-container");

    expect(mainContent.length).toEqual(1);
    // expect(casesList.length).toEqual(1);
    // expect(casesListContainer.length).toEqual(1);
  });

});
