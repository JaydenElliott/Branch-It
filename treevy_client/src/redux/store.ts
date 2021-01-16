import { createStore, combineReducers, applyMiddleware } from "redux";
import sidebarReducer from "./reducers/sidebarReducer";
import listsReducer from "./reducers/listsReducer";
import toastReducer from "./reducers/toastReducer";

/**
 * TESTING: This logger is for testing purposes only. Using it may result in a significant performance drop.
 */
const logger = (state) => (next) => (action) => {
  console.log("Logging state", state.getState());
  console.log("Logging action", action);
  next(action);
};

export default createStore(
  combineReducers({ toastReducer, sidebarReducer, listsReducer })
  // Uncomment section below to use logger.
  // ,
  // {},
  // applyMiddleware(logger)
);