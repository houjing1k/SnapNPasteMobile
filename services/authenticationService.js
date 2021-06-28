import React from "react";
import axios from "axios";
import {BYTEUS_URL} from "../common/config";
import {useSelector} from "react-redux";

const URL = {
    login: BYTEUS_URL + '/auth/jwt/login',
    register: BYTEUS_URL + '/auth/register',
    forgot_password: BYTEUS_URL + '/auth/forgot-password',
    reset_password: BYTEUS_URL + '/auth/reset-password',
    request_verify_token: BYTEUS_URL + '/auth/request-verify-token',
    verify: BYTEUS_URL + '/auth/verify',
    me: BYTEUS_URL + '/users/me',
    refresh_token: BYTEUS_URL + 'auth/jwt/refresh',
}

const authenticationService = {
    signIn: async (email, password) => {
        let userToken = null;
        const formData = new FormData();
        formData.append('username', email);
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
            console.log(e);
            return {
                type: 'INVALID_CREDENTIAL',
                data: null
            }
        }
    },
    signUp: async (email, username, password) => {
        try {
            const response = await axios.post(URL.register, {
                email: data.email,
                password: data.password,
                username: data.name,
            })
            return 'SUCCESS'
        } catch (e) {
            console.log(e);
            return 'FAILED'
        }

    },
    refreshToken: async (refreshToken) => {
        try {
            const response = await axios.get(
                URL.refresh_token, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                });
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    getProfile: async (userToken) => {
        const TOKEN = userToken;
        try {
            const response = await axios.get(
                URL.me, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`,
                    },
                });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    updateName: async (newName, userToken) => {
        // await axios.patch(
        //     URL.me,
        //     {
        //         username: newName,
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${userToken}`,
        //         },
        //     },
        // )
        //     .then((response) => {
        //         console.log(response);
        //         console.log('SUCCESS');
        //         return 'SUCCESS';
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         console.log('FAILED');
        //         return 'FAILED';
        //     });
        try {
            const response = await axios.patch(
                URL.me,
                {
                    username: newName,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                },)
            console.log(response);
            console.log('SUCCESS');
            return 'SUCCESS';
        } catch (error) {
            console.log(error);
            console.log('FAILED');
            return 'FAILED';
        }
    },
}

export default authenticationService;