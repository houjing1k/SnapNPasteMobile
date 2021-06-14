import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView, ScrollView, KeyboardAvoidingViewComponent
} from 'react-native';
import colors from "../common/colors";

import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from "../common/commonStyles";

function LoginScreen({ navigation }) {

    const login=()=>{
        navigation.navigate('Home')
    }
    const signup=()=>{
        navigation.navigate('Signup');
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar/>

            <View style={styles.contentContainer}>
                <View style={styles.logoContainer}>
                    <Icon name="camera-retro" size={150}/>
                    <Text style={styles.title}>Snap-N-Paste</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSetContainer}>
                        <Icon name="envelope" size={35} style={styles.inputIcon}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Email"}/>
                        </View>
                    </View>
                    <View style={styles.inputSetContainer}>
                        <MaterialIcon name="lock" size={35} style={styles.inputIcon}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Password"}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.forgetPassword}>
                        <Text style={styles.forgetPasswordText}>Forget Password</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signup}>
                    <Text style={styles.buttonText}>Signup</Text>
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
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    logoContainer: {
        // backgroundColor: 'yellow',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: commonStyles.buttonLargeFontSize,
    },
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
    forgetPassword: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        // borderWidth: 1,
    },
    forgetPasswordText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})

export default LoginScreen;
