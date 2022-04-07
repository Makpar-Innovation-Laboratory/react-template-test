// import { history } from "../store/configureStore";
import api from "../api";
import * as action from "../constants/actionTypes";

/**
 * Initial action handler for page load.
 * Requests which user is logged in.
 *
 * Back-end handles auth, so we're asking the server.
 *
 * @returns A thunk for use with Redux
 */
export const getCurrentUser = () => {
  return async (dispatch) => {
    dispatch({ type: action.LOAD_CURRENT_USER });

    try {
      const currentUser = await api.getCurrentUser();

      if (currentUser && currentUser.id) {
        dispatch({ type: action.LOAD_CURRENT_USER_SUCCESS, user: currentUser });
      } else {
        dispatch({
          type: action.LOAD_CURRENT_USER_FAILURE,
          error: "Successful call, but invalid/empty user object received.",
          user: currentUser,
        });
      }
    } catch (error) {
      dispatch({ type: action.LOAD_CURRENT_USER_FAILURE, error });
    }
  };
};
