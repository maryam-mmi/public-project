import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer.js";

const rootReducer = combineReducers({
  user_data: userDataReducer,
});

export default rootReducer;