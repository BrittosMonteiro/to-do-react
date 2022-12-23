import { combineReducers } from "redux";
import loginReducer from "./reducer/loginReducer";
import taskReducer from "./reducer/taskReducer";
import toggleReducer from "./reducer/toggleReducer";

const combinedReducers = combineReducers({
  login: loginReducer,
  task: taskReducer,
  toggle: toggleReducer,
});

export default combinedReducers;
