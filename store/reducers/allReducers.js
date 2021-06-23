import accountReducer from "./accountReducer";
import textSelectReducer from "./textSelectReducer";
import chatReducer from "./chatReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    account: accountReducer,
    textSelect: textSelectReducer,
    chat: chatReducer,
})

export default allReducers;