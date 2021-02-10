import { createStore, combineReducers } from "redux";

// Reducers
import navPageReducer from "./reducers/listNavReducer";
import userReducer from "./reducers/userReducer";

const allReducers = combineReducers({
  navPage: navPageReducer,
  user: userReducer,
});
const store = createStore(allReducers);
export default store;
