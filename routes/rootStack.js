import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';

const RootStack = createStackNavigator();

function RootStackNavigator() {
    return (
        <RootStack.Navigator initialRouteName="Login" headerMode='none'>
            <RootStack.Screen name="Login" component={LoginScreen}/>
            <RootStack.Screen name="Signup" component={SignupScreen}/>
        </RootStack.Navigator>
    )
}

export default RootStackNavigator
