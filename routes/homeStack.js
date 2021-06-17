import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import SnapScreen from "../screens/snapScreen";
import ConnectionsScreen from "../screens/connectionsScreen";
import AccountSettingScreen from "../screens/accountSettingScreen";
import AccountScreen from "../screens/accountScreen";
import FeedbackScreen from "../screens/feedbackScreen";
import HistoryScreen from "../screens/historyScreen";
import TextSelectScreen from "../screens/text/textSelectScreen";
import TextConfirmationScreen from "../screens/text/textConfirmationScreen";
import ImageEditScreen from "../screens/image/imageEditScreen";
import ImageConfirmationScreen from "../screens/image/imageConfirmationScreen";
import PdfEditScreen from "../screens/pdf/pdfEditScreen";
import PDFConfirmationScreen from "../screens/pdf/pdfConfirmationScreen";

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator initialRouteName="Home" headerMode='none'>
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            {/*<HomeStack.Screen name="Login" component={LoginScreen}/>*/}
            {/*<HomeStack.Screen name="Signup" component={SignupScreen}/>*/}
            <HomeStack.Screen name="Snap" component={SnapScreen} options={{unmountOnBlur: true}}/>
            <HomeStack.Screen name="Connections" component={ConnectionsScreen}/>
            <HomeStack.Screen name="Account" component={AccountScreen}/>
            <HomeStack.Screen name="AccountSetting" component={AccountSettingScreen}/>
            <HomeStack.Screen name="Feedback" component={FeedbackScreen}/>
            <HomeStack.Screen name="History" component={HistoryScreen}/>
            <HomeStack.Screen name="TextSelect" component={TextSelectScreen}/>
            <HomeStack.Screen name="TextConfirmation" component={TextConfirmationScreen}/>
            <HomeStack.Screen name="ImageEdit" component={ImageEditScreen}/>
            <HomeStack.Screen name="ImageConfirmation" component={ImageConfirmationScreen}/>
            <HomeStack.Screen name="PdfEdit" component={PdfEditScreen}/>
            <HomeStack.Screen name="PdfConfirmation" component={PDFConfirmationScreen}/>
        </HomeStack.Navigator>
    )
}

export default HomeStackNavigator
