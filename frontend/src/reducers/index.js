import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import CurrentUserReducer from "./CurrentUserReducer";

/* istanbul ignore next */
const rootReducer = history => combineReducers({
  router: connectRouter(history),
  currentUser: CurrentUserReducer,
});

export default rootReducer;
