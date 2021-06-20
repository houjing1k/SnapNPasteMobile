import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {BYTEUS_URL} from "../common/config";

const URL = {
    login: BYTEUS_URL + '/auth/jwt/login',
    register: BYTEUS_URL + '/auth/register',
    forgot_password: BYTEUS_URL + '/auth/forgot-password',
    reset_password: BYTEUS_URL + '/auth/reset-password',
    request_verify_token: BYTEUS_URL + '/auth/request-verify-token',
    verify: BYTEUS_URL + '/auth/verify',
    me: BYTEUS_URL + '/users/me',
}

const authenticationService = {
    signIn: async (userName, password) => {
        let userToken = null;
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', password);
        try {
            let response = await axios.post(URL.login, formData,
                {headers: {'Content-Type': 'multipart/form-data',}});
            // console.log(response);
            try {
                let data = response.data;
                // console.log('/////////data//////////')
                // console.log(data);
                userToken = data.access_token;
                // console.log(userToken);
                return {
                    type: 'SUCCESS',
                    data: userToken
                }
            } catch (e) {
                console.log(e);
                return {
                    type: 'ERROR',
                    data: null
                }
            }
        } catch (e) {
            // console.log(e);
            return {
                type: 'INVALID_CREDENTIAL',
                data: null
            }
        }
    },
    signOut: async () => {
        try {
            await AsyncStorage.removeItem('userToken');
        } catch (e) {
            console.log(e);
        }
    },
    signUp: async (userName, name, password) => {
        await axios.post(URL.register, {
            email: data.email,
            password: data.password,
        })
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration Successful",
                    "Your account has been created.",
                    [
                        {
                            text: "OK", onPress: () => {
                                navigation.pop();
                            }
                        }]
                );
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(
                    "Registration Unsuccessful",
                    "Account already exists",
                    [{
                        text: "OK", onPress: () => {
                        }
                    }]
                );
            });
    },
    setCookie: async () => {

    },
    removeCookie: async () => {

    },
    getProfile: async (userToken) => {
        const TOKEN = userToken;
        try {
            let response = await axios.get(
                URL.me, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`,
                    },
                });
            return response.data;
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    updateProfile: async () => {

    },
}

export default authenticationService;