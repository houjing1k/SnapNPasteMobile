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
    KeyboardAvoidingView, ScrollView, KeyboardAvoidingViewComponent, Keyboard, Image, Platform
} from 'react-native';
import colors from "../common/colors";

import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import commonStyle from "../common/commonStyles";
import {vw, vh} from "react-native-expo-viewport-units";
import {AuthContext} from "../context/context";
import logo from '../assets/snp-logo.png'
import {SvgXml} from "react-native-svg";


function LoginScreen({navigation}) {

    const {signIn} = useContext(AuthContext);

    const loginAction = () => {
        console.log('username: ' + data.email);
        console.log('password: ' + data.password);
        signIn(data.email, data.password);
        // navigation.navigate('Home')
    }
    const signupAction = () => {
        navigation.navigate('Signup');
    }

    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    })

    const handleEmailChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            })
        }
    };
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
            check_textInputChange: true,
        })
    };
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

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
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==="ios"? "padding":"height"}>
            <StatusBar/>

            <View style={styles.contentContainer}>
                
                {/*<SvgXml xml={logo}/>*/}
                <Image style={styles.logoContainer} source={logo}/>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSetContainer}>
                        <Icon name="envelope" size={30} style={styles.inputIcon} color={colors.grey}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={[styles.input, {width: 220}]}
                                placeholder={"Email"}
                                onChangeText={(val) => handleEmailChange(val)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputSetContainer}>
                        <MaterialIcon name="lock" size={30} style={styles.inputIcon} color={colors.grey}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={data.secureTextEntry}
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <TouchableOpacity style={styles.visibilityIconButton} onPress={updateSecureTextEntry}>
                                <MaterialIcon name={data.secureTextEntry ? 'visibility-off' : 'visibility'}
                                              size={25} color={colors.iconDark}/>
                            </TouchableOpacity>

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
        paddingBottom: 5,
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
        // backgroundColor: '#E35350',
        maxHeight: 300,
        maxWidth: 250,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonText: {},
    inputContainer: {
        // backgroundColor: 'yellow',
        // marginTop: 20,
    },
    inputSetContainer: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputFieldContainer: {
        // backgroundColor: 'green',
        width: 250,
        height: 50,
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
    input: {
        // backgroundColor: '#FFFFFF',
        // borderWidth: 2,
        width: 185,
        fontSize: 17,
        // marginRight: 5,
    },
    visibilityIconButton: {
        // borderWidth: 2,
        alignItems: 'center',
        width: 30,
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
