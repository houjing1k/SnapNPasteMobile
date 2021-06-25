import * as React from 'react';
import {Button, View, Text, ActivityIndicator, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackNavigator from './routes/homeStack';
import RootStackNavigator from "./routes/rootStack";
import {useContext, useEffect, useMemo, useReducer, useState} from "react";
import colors from "./common/colors";
import commonStyle from "./common/commonStyles";
import {AuthContext} from "./context/context";
import * as SecureStore from 'expo-secure-store';
import {createStore} from "redux";
import allReducers from "./store/reducers/allReducers";
import {Provider, useDispatch, useSelector} from "react-redux";
import {login, logout, register, retrieveInfo, retrieveToken} from "./store/actions/accountActions";
import authenticationService from "./services/authenticationService";
import defaultAvatar from './assets/avatar.png';

function App() {
    const store = createStore(allReducers);
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    )
}

function Root() {
    const dispatch = useDispatch();
    const account = useSelector(state => state.account);

    const authContext = useMemo(() => ({
        signIn: async (email, password) => {
            let userToken = null;
            const response = await authenticationService.signIn(email, password);
            console.log(response)
            switch (response.type) {
                case 'SUCCESS':
                    userToken = response.data;
                    await SecureStore.setItemAsync('userToken', userToken);
                    dispatch(login(email, userToken));
                    console.log('--- Login Success ---');
                    console.log('email:' + email);
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
                await SecureStore.deleteItemAsync('userToken');
                console.log('Removed token from storage');
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
                dispatch(retrieveInfo(info.email, info.username, defaultAvatar, 'FREE'));
            } else {
                console.log("Error retrieving profile");
            }
        },
        updateUsername: async (newUsername, userToken) => {
            try {
                const res = authenticationService.updateName(newUsername, userToken);
                // console.log('rrrrrrrrrr');
                if (res === 'SUCCESS') {
                    console.log("Update success");
                    // add dispatcher method
                } else alert("Error updating");
            } catch (e) {
                alert("Error updating");
            }
        }
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                // userToken = await AsyncStorage.getItem('userToken');
                userToken = await SecureStore.getItemAsync('userToken');
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
