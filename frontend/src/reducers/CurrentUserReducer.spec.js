import reducer from "./CurrentUserReducer";
import initialState from "./initialState";
import {
    LOAD_CURRENT_USER,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_FAILURE
} from "../constants/actionTypes";
import {
    sampleUsers
} from "../api/MockApiData";

describe("Reducer Tests :: CurrentUserReducer", () => {
    describe("LOAD_CURRENT_USER Tests", () => {
        test("Initial State Of Current User Is Correctly Returned", () => {
            const action = { type: LOAD_CURRENT_USER};
            const expected = initialState.currentUser;
            const actual = reducer(undefined, action);
            expect(actual).toEqual(expected);
        });
    });

    describe("LOAD_CURRENT_USER_SUCCESS Tests", () => {
        test("New User Is Loaded And Fields Are Correctly Set", () => {
            const user = {...sampleUsers[3]};
            const action = { type: LOAD_CURRENT_USER_SUCCESS, user: user };
            const expected = {
              id: user.id,
              name: user.name,
              roles: [...user.roles],
            };

            const actual = reducer(undefined, action);
            expect(actual).toEqual(expected);
        });
    });

    describe("LOAD_CURRENT_USER_FAILURE Tests", () => {
        test("Initial State Of Current User is Correctly Returned", () => {
            const action = { type: LOAD_CURRENT_USER_FAILURE };
            const expected = {
                ...initialState.currentUser
            };
            const actual = reducer(undefined, action);
            expect(actual).toEqual(expected);
        });
    });
});
