import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarReducer from "./reducers/sideBarReducer";

const logger = (state) => (next) => (action) => {
    console.log("Logging action", action);
    next(action);
} 

export default createStore(
    combineReducers({sideBarReducer}),
    {},
    applyMiddleware(logger)
);