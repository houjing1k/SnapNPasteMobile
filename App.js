import * as React from 'react';
import {Button, View, Text, ActivityIndicator, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackNavigator from './routes/homeStack';
import RootStackNavigator from "./routes/rootStack";
import {useContext, useEffect, useMemo, useReducer, useState} from "react";
import colors from "./common/colors";
import commonStyle from "./common/commonStyles";
import {AuthContext, SelectionProvider} from "./context/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {createStore} from "redux";
import allReducers from "./reducers/allReducers";
import {Provider} from "react-redux";

function App() {

    const store = createStore(allReducers);

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
            const formData = new FormData();
            formData.append('username', userName);
            formData.append('password', password);
            axios.post(
                'http://byteus.me:8000/auth/jwt/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
                .then(async (response) => {
                    console.log(response);
                    try {
                        let data = response.data;
                        console.log('/////////data//////////')
                        console.log(data);
                        userToken = data.access_token;
                        console.log(userToken);
                        await AsyncStorage.setItem('userToken', userToken);
                        console.log('username:' + userName);
                        dispatch({type: 'LOGIN', id: userName, token: userToken});
                        console.log(loginState);
                    } catch (e) {
                        console.log('error 123')
                        console.log(e);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert(
                        "Invalid username or password",
                        "",
                        [{
                            text: "OK", onPress: () => {
                            }
                        }]
                    );
                });
            console.log('user token: ' + userToken);

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
            // console.log('user token: ' + userToken);
        },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                console.log('fetched userToken: ' + userToken)
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'REGISTER', token: userToken});
        }, 0);
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
        <Provider store={store}>
            <AuthContext.Provider value={authContext}>
                <SelectionProvider>
                    <NavigationContainer>
                        {loginState.userToken !== null ? <HomeStackNavigator/> : <RootStackNavigator/>}
                    </NavigationContainer>
                </SelectionProvider>
            </AuthContext.Provider>
        </Provider>
    );
}

export default App;
