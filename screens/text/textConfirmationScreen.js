import * as React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyles from "../../common/commonStyles";

function TextConfirmationScreen({ navigation }) {

    const pasteButtonAction=()=>{
        navigation.navigate('Home')
    }
    const button2Action=()=>{
        // navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Preview Text'} backEnabled={true} cancelEnabled={true}/>
            <View style={styles.contentContainer}>
                <View>
                    <Text>Text Confirmation Screen</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={pasteButtonAction}>
                    <Text style={styles.buttonText}>Paste to PC</Text>
                </TouchableOpacity>
            </View>

        </View>
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
        flex: 3,
        backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
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
    }
})

export default TextConfirmationScreen;
