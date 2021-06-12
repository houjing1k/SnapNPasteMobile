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
    TextInput, ScrollView
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import commonStyles from "../common/commonStyles";

function SignupScreen({ navigation }) {

    const register=()=>{
        Alert.alert(
            "Registration Successful",
            "Your account has been created.",
            [
                { text: "OK", onPress: () => {
                    console.log("OK Pressed");
                    navigation.pop();
                }}
            ]
        );

    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={"Sign Up"} backEnabled={true} cancelEnabled={false}/>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSetContainer}>
                        <Icon name="envelope" size={35} style={styles.inputIcon}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Email"}/>
                        </View>
                    </View>
                    <View style={styles.inputSetContainer}>
                        <MaterialIcon name="face" size={35} style={styles.inputIcon}/>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.input} placeholder={"Name"}/>
                        </View>
                    </View>
                    <View style={styles.inputSetContainer}>
                        <MaterialIcon name="lock" size={35} style={styles.inputIcon}/>
                        <View style={styles.doubleInputContainer}>
                            <View style={styles.inputFieldContainer}>
                                <TextInput style={styles.input} placeholder={"Password"}/>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput style={styles.input} placeholder={"Re-enter Password"}/>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#87f353',
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
        height: 80,
        // backgroundColor: '#183fc8',
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
    buttonText: {
        fontSize: commonStyles.buttonLargeFontSize,
    },
    inputContainer: {
        // backgroundColor: 'yellow',
        marginTop: 30,
    },
    inputSetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
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
