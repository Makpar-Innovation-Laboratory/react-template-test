import * as ActionTypes from "../constants/actionTypes";
import configureStore from "./configureStore";
import {
  sampleUsers,
} from "../api/MockApiData";

describe("Store Tests", () => {

  test("The Store Should Handle A Flurry Of Actions For Adjudicator Users", () => {
    const store = configureStore();
    const aUser = sampleUsers[4];
    
    const actions = [
      { type: ActionTypes.LOAD_CURRENT_USER },
      { type: ActionTypes.LOAD_CURRENT_USER_SUCCESS, user: aUser },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();

    // User Slice
    expect(actual.currentUser.id).toEqual(aUser.id);
    expect(actual.currentUser.name).toEqual(aUser.name);
  });

});
