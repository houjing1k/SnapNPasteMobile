import React, {createContext, useState} from 'react'

export const AuthContext = createContext(null);

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [loginState, setLoginState] = useState({
        isLoading: true,
        userName: null,
        userToken: null,
        name: null,
        subscription: null,
    })

    return <UserContext.Provider value={[loginState, setLoginState]}>{children}</UserContext.Provider>
}

export const SelectionContext = createContext(null);

export const SelectionProvider = ({children}) => {
    const [selectedText, setSelectedText] = useState([])

    return <SelectionContext.Provider value={[selectedText, setSelectedText]}>{children}</SelectionContext.Provider>
}