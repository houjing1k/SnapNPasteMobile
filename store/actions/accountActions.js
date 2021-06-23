import {LOGIN, LOGOUT, REGISTER, RETRIEVE_INFO, RETRIEVE_TOKEN} from "./types";

export const retrieveToken = (userToken) => {
    return {
        type: RETRIEVE_TOKEN,
        token: userToken
    }
}
export const login = (email, userToken) => {
    return {
        type: LOGIN,
        email: email,
        token: userToken
    }
}
export const logout = () => {
    return {
        type: LOGOUT,
    }
}
export const register = (email, userToken) => {
    return {
        type: REGISTER,
        email: email,
        token: userToken
    }
}
export const retrieveInfo = (email, username, profilePicture, subscriptionType) => {
    return {
        type: RETRIEVE_INFO,
        email: email,
        username: username,
        profilePicture: profilePicture,
        subscriptionType: subscriptionType,
    }
}
