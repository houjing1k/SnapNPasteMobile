import React from "react";
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import colors from "../common/colors";

function Header({ navigation, text, backEnabled, cancelEnabled}) {

    const back=()=>{
        navigation.pop();
    }
    const cancel=()=>{
        navigation.navigate('Home');
    }

    const BackButton = () => {
        if(backEnabled)
            return(
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={back}>
                        <Icon
                            name='arrow-left'
                            type='evilicon'
                            color='#000000'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            );
        else return(
            <View style={styles.backButtonContainer}>
                <View style={styles.backButton} />
            </View>
        );
    };
    const CancelButton = () => {
        if(cancelEnabled)
            return(
                <View style={styles.cancelButtonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
                        <Icon
                            name='close-o'
                            type='evilicon'
                            color='#000000'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            );
        else return(
            <View style={styles.cancelButtonContainer}>
                <View style={styles.cancelButton} />
            </View>
        );
    };


    return(
        <View style={styles.container}>
            <BackButton/>
            <View style={styles.centerContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <CancelButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
    },
    backButtonContainer: {
        // backgroundColor: '#123462',
        width: 70,
    },
    centerContainer:{
        // backgroundColor: '#833462',
        justifyContent: 'center'
    },
    cancelButtonContainer: {
        // backgroundColor: '#fc3462',
        flexDirection: 'row-reverse',
    },
    backButton: {
        width: 50,
        height: 50,
        // backgroundColor: colors.primaryColor,
        borderRadius: 25,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        width: 50,
        height: 50,
        // backgroundColor: colors.secondaryColor,
        borderRadius: 25,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
    },
})

export default Header;
