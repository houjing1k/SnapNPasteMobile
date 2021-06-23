import {LOGIN, LOGOUT, REGISTER, RETRIEVE_INFO, RETRIEVE_TOKEN} from "../actions/types";

const initialLoginState = {
    isLoading: true,
    userToken: null,
    email: null,
    username: null,
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
                email: action.email,
                username:action.username,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                userToken: action.token,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...loginState,
                email: null,
                userToken: null,
                username: null,
                profilePicture: null,
                subscriptionType: null,
                isLoading: false
            };
        case REGISTER:
            return {
                ...loginState,
                email: action.email,
                userToken: action.token,
                username:action.username,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                isLoading: false
            };
        case RETRIEVE_INFO:
            console.log('reducing...')
            console.log(action.email)
            console.log(action.username)
            return {
                ...loginState,
                email: action.email,
                username:action.username,
                profilePicture: action.profilePicture,
                subscriptionType: action.subscriptionType,
                isLoading: false
            };
        default:
            return loginState
    }
};

export default accountReducer;