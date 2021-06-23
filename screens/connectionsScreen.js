import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import {useDispatch, useSelector} from "react-redux";
import {selectDevice, sendText} from "../store/actions/chatActions";

function ConnectionsScreen({navigation}) {

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    // console.log(chat.deviceList);

    const button2Action = () => {
        sendText('Hello', chat);
    }
    const selectDeviceAction = (deviceName) => {
        selectDevice(dispatch, deviceName);
    }
    // selectDeviceAction('laptop');

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'My Connections'} backEnabled={true}/>
            <View style={styles.contentContainer}>
                <Text>{'Selected Device:'}</Text>
                <Text>{chat.selectedDevice}</Text>
                <Text>{'\n\nOnline devices:'}</Text>
                {
                    chat.deviceList.map((device) => {
                        return (
                            <TouchableOpacity key={chat.deviceList.indexOf(device)} onPress={() => {
                                console.log('pressed ' + device);
                                selectDeviceAction(device);
                            }}>
                                <Text>{device}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text>{'\n\nDevice Name (UUID):'}</Text>
                <Text>{chat.activeDevice}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={commonStyle.buttonDual} onPress={button2Action}>
                    <Text style={styles.buttonText}>Send Text</Text>
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
        // backgroundColor: '#D0D0D0',
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
})

export default ConnectionsScreen;
