import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarReducer from "./reducers/sideBarReducer";
import listsReducer from "./reducers/listsReducer";

/**
 * TESTING: This logger is for testing purposes only. Using it may result in a significant performance drop.
 */
const logger = (state) => (next) => (action) => {
  console.log("Logging state", state.getState());
  console.log("Logging action", action);
  next(action);
};

export default createStore(
  combineReducers({ sideBarReducer, listsReducer })
  // Uncomment section below to use logger.
  // ,
  // {},
  // applyMiddleware(logger)
);
