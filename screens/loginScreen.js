import React, {useContext, useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView, ScrollView, KeyboardAvoidingViewComponent, Keyboard
} from 'react-native';
import colors from "../common/colors";

import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import commonStyle from "../common/commonStyles";
import {vw, vh} from "react-native-expo-viewport-units";
import {AuthContext} from "../context/context";

function LoginScreen({navigation}) {

    const {signIn} = useContext(AuthContext);

    const loginAction = () => {
        console.log('username: '+username);
        console.log('password: '+password);
        signIn(username, password);
        // navigation.navigate('Home')
    }
    const signupAction = () => {
        navigation.navigate('Signup');
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus(true);
    const _keyboardDidHide = () => setKeyboardStatus(false);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar/>

            <View style={styles.contentContainer}>
                <View style={styles.logoContainer}>
                    <Icon name="camera-retro" size={120} color={'#000000'}/>
                    {
                        keyboardStatus ? <View/> : <Text style={styles.title}>Snap-N-Paste</Text>
                    }
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSetContainer}>
                        <Icon name="envelope" size={35} style={styles.inputIcon} color={colors.grey}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Email"}
                                       onChangeText={(text) => setUsername(text)}/>
                        </View>
                    </View>
                    <View style={styles.inputSetContainer}>
                        <MaterialIcon name="lock" size={35} style={styles.inputIcon} color={colors.grey}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Password"} secureTextEntry={true}
                                       onChangeText={(text) => setPassword(text)}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.forgetPassword}>
                        <Text style={styles.forgetPasswordText}>Forget Password</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={commonStyle.buttonDual} onPress={loginAction}>
                    <Text style={commonStyle.commonTextStyleLight}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.buttonDual} onPress={signupAction}>
                    <Text style={commonStyle.commonTextStyleLight}>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottomContainer: {
        // flex: 1,
        // backgroundColor: '#183fc8',
        height: 160,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: colors.primaryColor,
        width: 300,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    logoContainer: {
        // backgroundColor: 'yellow',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonText: {},
    inputContainer: {
        // backgroundColor: 'yellow',
        marginTop: 20,
    },
    inputSetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputFieldContainer: {
        // backgroundColor: 'green',
        width: 250,
        height: 50,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.color3,
        // alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    input: {
        // backgroundColor: '#FFFFFF',
        // borderWidth: 2,
        fontSize: 17,
    },
    inputIcon: {
        marginRight: 10,
    },
    forgetPassword: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        // borderWidth: 1,
    },
    forgetPasswordText: {
        fontSize: 14,
        // textDecorationLine: 'underline'
    }
})

export default LoginScreen;
