import loginReducer from "./loginReducer";
import textSelectReducer from "./textSelectReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    login: loginReducer,
    // textSelect: textSelectReducer,
})

export default allReducers;