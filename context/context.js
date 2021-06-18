import React, {createContext} from 'react'

export const AuthContext = createContext(null);

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [username, setUsername] = React.useState('')
    const [userToken, setUserToken] = React.useState('')
    const [name, setName] = React.useState('')

    const store = {
        usernameStore: [username, setUsername],
        userTokenStore: [userToken, setUserToken],
        nameStore: [name, setName],
    }

    return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}