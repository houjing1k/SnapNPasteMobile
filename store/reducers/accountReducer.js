import {LOGIN, LOGOUT, REGISTER, RETRIEVE_INFO, RETRIEVE_TOKEN} from "../actions/types";

const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
    name: null,
    profilePicture: null,
    subscriptionType: null,
};

const accountReducer = (loginState = initialLoginState, action) => {
    switch (action.type) {
        case RETRIEVE_TOKEN:
            return {
                ...loginState,
                userToken: action.token,
                isLoading: false
            };
        case LOGIN:
            return {
                ...loginState,
                userName: action.id,
                name:action.name,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                userToken: action.token,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...loginState,
                userName: null,
                userToken: null,
                name: null,
                profilePicture: null,
                subscriptionType: null,
                isLoading: false
            };
        case REGISTER:
            return {
                ...loginState,
                userName: action.id,
                userToken: action.token,
                name:action.name,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                isLoading: false
            };
        case RETRIEVE_INFO:
            return {
                ...loginState,
                userName: action.id,
                name:action.name,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                isLoading: false
            };
        default:
            return loginState
    }
};

export default accountReducer;