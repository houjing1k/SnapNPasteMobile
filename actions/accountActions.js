export const retrieveToken = (userToken) => {
    return {
        type: 'RETRIEVE_TOKEN',
        token: userToken
    }
}
export const login = (userName, userToken) => {
    return {
        type: 'LOGIN',
        id: userName,
        token: userToken
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}
export const register = (userName, userToken) => {
    return {
        type: 'LOGIN',
        id: userName,
        token: userToken
    }
}
export const retrieveInfo = (userName) => {
    return {
        type: 'RETRIEVE_INFO',
        id: userName,

    }
}
