import * as React from 'react';
import {Button, View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackNavigator from './routes/homeStack';
import RootStackNavigator from "./routes/rootStack";
import {useEffect, useMemo, useReducer, useState} from "react";
import colors from "./common/colors";
import commonStyle from "./common/commonStyles";
import {AuthContext} from "./context/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
    // const [isLoading, setIsLoading] = useState(true);
    // const [userToken, setUserToken] = useState(null);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        signIn: async (userName, password) => {
            let userToken = null;
            if (userName == 'user' && password == '123') {
                try {
                    userToken = '123456';
                    await AsyncStorage.setItem('userToken', userToken);
                } catch (e) {
                    console.log(e);
                }
            }
            console.log('user token: ' + userToken);
            dispatch({type: 'LOGIN', id: userName, token: userToken});
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
        },
        signUp: () => {
            console.log('user token: ' + userToken);
            setUserToken('aaaa');
            setIsLoading(false);
        },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }
            console.log('user token: ' + userToken);
            dispatch({type: 'REGISTER', token: userToken});
        }, 1000);
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.iconDark}/>
                <Text style={[commonStyle.commonTextStyleDark, {marginTop: 15}]}>Loading</Text>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? <HomeStackNavigator/> : <RootStackNavigator/>}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default App;
