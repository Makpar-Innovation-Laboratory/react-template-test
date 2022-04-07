import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as action from "../constants/actionTypes";
import rootReducer from "../reducers";
import * as actions from ".";
import {} from "../api/MockApiData";

describe("Redux Tests :: Actions", () => {

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe("Happy Path Tests", () => {
    let store;
    beforeEach( () => {
      store = mockStore(rootReducer);
    });

    test("getCurrentUser Fires Expected Actions On Page Load", () => {
      return store.dispatch(actions.getCurrentUser())
        .then( () => {
          const actualActions = store.getActions();
          const loadUser = actualActions.find( a => a.type === action.LOAD_CURRENT_USER);
          const loadUserSucc = actualActions.find( a => a.type === action.LOAD_CURRENT_USER_SUCCESS);

          expect(loadUser).not.toBeNull();
          expect(loadUserSucc).not.toBeNull();
          expect(loadUserSucc.user.name).toBeDefined();
        });
    });

  });

});
