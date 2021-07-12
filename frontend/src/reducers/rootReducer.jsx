import { combineReducers } from "redux";
import deviceReducer from "./deviceReducer";
import authReducer from "./authReducer";

export default combineReducers({
    deviceState: deviceReducer,
    authState: authReducer
}) 