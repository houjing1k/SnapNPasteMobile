import accountReducer from "./accountReducer";
import textSelectReducer from "./textSelectReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    account: accountReducer,
    textSelect: textSelectReducer,
})

export default allReducers;