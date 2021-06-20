import * as React from 'react';
import {Button, View, Text, ActivityIndicator, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackNavigator from './routes/homeStack';
import RootStackNavigator from "./routes/rootStack";
import {useContext, useEffect, useMemo, useReducer, useState} from "react";
import colors from "./common/colors";
import commonStyle from "./common/commonStyles";
import {AuthContext} from "./context/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {createStore} from "redux";
import allReducers from "./reducers/allReducers";
import {Provider, useDispatch, useSelector} from "react-redux";
import {login, logout, register, retrieveInfo, retrieveToken} from "./actions/accountActions";
import authenticationService from "./services/authenticationService";

function App() {
    const store = createStore(allReducers);
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    )
}

function Root() {
    // const initialLoginState = {
    //     isLoading: true,
    //     userName: null,
    //     userToken: null,
    // };

    // const loginReducer = (prevState, action) => {
    //     switch (action.type) {
    //         case 'RETRIEVE_TOKEN':
    //             return {
    //                 ...prevState,
    //                 userToken: action.token,
    //                 isLoading: false
    //             };
    //         case 'LOGIN':
    //             return {
    //                 ...prevState,
    //                 userName: action.id,
    //                 userToken: action.token,
    //                 isLoading: false
    //             };
    //         case 'LOGOUT':
    //             return {
    //                 ...prevState,
    //                 userName: null,
    //                 userToken: null,
    //                 isLoading: false
    //             };
    //         case 'REGISTER':
    //             return {
    //                 ...prevState,
    //                 userName: action.id,
    //                 userToken: action.token,
    //                 isLoading: false
    //             };
    //     }
    // };

    // const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);

    const authContext = useMemo(() => ({
        signIn: async (userName, password) => {
            let userToken = null;
            const response = await authenticationService.signIn(userName, password);
            console.log(response)
            switch (response.type) {
                case 'SUCCESS':
                    userToken = response.data;
                    AsyncStorage.setItem('userToken', userToken);
                    dispatch(login(userName, userToken));
                    console.log('--- Login Success ---');
                    console.log('userName:' + userName);
                    console.log('userToken:' + userToken);
                    break;
                case 'INVALID_CREDENTIAL':
                    alert("Invalid username or password");
                    break;
                case "ERROR":
                    console.log('ERROR');
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch(logout());
        },
        signUp: () => {
            // console.log('user token: ' + userToken);
        },
        getProfile: async (userToken) => {
            const info = await authenticationService.getProfile(userToken);
            if (info != null) {
                console.log("Profile found:");
                console.log(info);
                dispatch(retrieveInfo(info.email));
            }else{
                console.log("Error retrieving profile");
            }
        }
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
            dispatch(retrieveToken(userToken));
        }, 0);
    }, []);

    if (account.isLoading) {
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
                {account.userToken !== null ? <HomeStackNavigator/> : <RootStackNavigator/>}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default App;
