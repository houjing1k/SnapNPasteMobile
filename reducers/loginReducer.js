const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
};

const loginReducer = (loginState = initialLoginState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...loginState,
                userToken: action.token,
                isLoading: false
            };
        case 'LOGIN':
            return {
                ...loginState,
                userName: action.id,
                userToken: action.token,
                isLoading: false
            };
        case 'LOGOUT':
            return {
                ...loginState,
                userName: null,
                userToken: null,
                isLoading: false
            };
        case 'REGISTER':
            return {
                ...loginState,
                userName: action.id,
                userToken: action.token,
                isLoading: false
            };
        default:
            return loginState
    }
};

export default loginReducer;