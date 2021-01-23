import { createStore, combineReducers } from "redux";

// Reducers
import navPageReducer from "./reducers/listNavReducer";

const allReducers = combineReducers({
  navPage: navPageReducer,
});
const store = createStore(allReducers);
export default store;
