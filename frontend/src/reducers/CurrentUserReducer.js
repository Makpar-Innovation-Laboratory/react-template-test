/* eslint-disable no-case-declarations */
import initialState from "./initialState";
import {
  LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
} from "../constants/actionTypes";

const CurrentUserReducer = (state=initialState.currentUser, action) => {
  switch (action.type) {
    case LOAD_CURRENT_USER:
      // Set a loading flag here one day?
      return state;

    case LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        // unset loading flag?
        id: action.user.id,
        name: action.user.name,
        roles: [ ...action.user.roles ],
      };

    case LOAD_CURRENT_USER_FAILURE:
      return {
        // unset loading flag?
        ...initialState.currentUser,
      };

    default:
      return state;
  }
};

export default CurrentUserReducer;
