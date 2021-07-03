import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    TextInput, ScrollView, Platform
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import commonStyles from "../common/commonStyles";
import {useContext, useEffect, useState} from "react";
import commonStyle from "../common/commonStyles";
import axios from "axios";
import {AuthContext} from "../context/context";

function SignupScreen({navigation}) {

    const {signUp} = useContext(AuthContext);

    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        passwordCheck: '',
        isValidEmail: false,
        isValidName: false,
        isValidPassword: false,
        isPasswordMatch: false,
    })

    const register = async () => {
        if (data.isValidEmail && data.isValidPassword && data.isPasswordMatch&&data.isValidName) {
            await axios.post('http://byteus.me:8000/auth/register', {
                email: data.email,
                password: data.password,
                username: data.name
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
        } else {
            Alert.alert(
                "Invalid Input",
                (!data.isValidEmail ? 'Invalid Email\n' : '') +
                (!data.isValidName ? 'Invalid Name\n' : '') +
                (!data.isValidPassword ? 'Invalid Password\n' : '') +
                (!data.isPasswordMatch ? 'Password does not match\n' : ''),
                [{text: "OK"}]
            )
        }


    }

    const handleEmailChange = (val) => {
        setData({
            ...data,
            email: val,
            isValidEmail: val !== '',
        });
    }
    const handleNameChange = (val) => {
        setData({
            ...data,
            name: val,
            isValidName: val !== '',
        })
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
            isValidPassword: val !== '',
        })
    }
    const handlePasswordCheckChange = (val) => {
        setData({
            ...data,
            passwordCheck: val,
            isPasswordMatch: val === data.password,
        })
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <SafeAreaView>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==="ios"? "padding":"height"}>
                <StatusBar/>
                <Header navigation={navigation} text={"Sign Up"} backEnabled={true} cancelEnabled={false}/>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSetContainer}>
                            <Icon name="envelope" size={35} style={styles.inputIcon}/>
                            <View style={styles.inputFieldContainer}>
                                <TextInput style={styles.input} placeholder={"Email"}
                                           onChangeText={(val) => handleEmailChange(val)}/>
                            </View>
                        </View>
                        <View style={styles.inputSetContainer}>
                            <MaterialIcon name="face" size={35} style={styles.inputIcon}/>
                            <View style={styles.inputFieldContainer}>
                                <TextInput style={styles.input} placeholder={"Name"}
                                           onChangeText={(val) => handleNameChange(val)}/>
                            </View>
                        </View>
                        <View style={styles.inputSetContainer}>
                            <MaterialIcon name="lock" size={35} style={styles.inputIcon}/>
                            <View style={styles.doubleInputContainer}>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput style={styles.input} placeholder={"Password"}
                                               onChangeText={(val) => handlePasswordChange(val)}
                                               secureTextEntry={true}/>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput style={styles.input} placeholder={"Re-enter Password"}
                                               onChangeText={(val) => handlePasswordCheckChange(val)}
                                               secureTextEntry={true}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={commonStyle.buttonSingle} onPress={register}>
                        <Text style={commonStyle.commonTextStyleLight}>Create Account</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
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
        // flex: 1,
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    bottomContainer: {
        height: 100,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    button: {
        backgroundColor: colors.primaryColor,
        width: 300,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    buttonText: {
        fontSize: commonStyles.buttonLargeFontSize,
    },
    inputContainer: {
        // backgroundColor: 'yellow',
        marginTop: 15,
    },
    inputSetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    inputFieldContainer: {
        // backgroundColor: 'green',
        width: 250,
        height: 50,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderWidth: 2,
        // alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    input: {
        // backgroundColor: '#FFFFFF',
        // borderWidth: 2,
        fontSize: 18,
    },
    inputIcon: {
        marginRight: 10,
    },
    doubleInputContainer: {
        flexDirection: 'column'
    },
})

export default SignupScreen;
