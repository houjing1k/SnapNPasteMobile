import React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import {vw} from 'react-native-expo-viewport-units';
import {useDispatch, useSelector} from "react-redux";
import {selectDevice, sendText} from "../store/actions/chatActions";


function ConnectionsScreen({navigation}) {

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    // console.log(chat.deviceList);

    const button2Action = () => {
        // navigation.navigate('Signup');
        sendText('Hello', chat);
    }
    const selectDeviceAction = (deviceName) => {
        selectDevice(dispatch, deviceName);
    }


    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Device Selection'} backEnabled={true}/>
            <View style={styles.contentContainer}>

                <View style={styles.titleContainer}>
                    <Text style={commonStyle.commonTextStyleDark}>Pasting To :</Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        chat.deviceList.length !== 0 ?
                            chat.deviceList.map((device) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.connectionContainer, {borderColor: device === chat.selectedDevice ? colors.color4 : colors.color3}]}
                                        key={chat.deviceList.indexOf(device)}
                                        onPress={() => {
                                            console.log('pressed ' + device);
                                            selectDeviceAction(device);
                                        }}>
                                        <Text style={{fontSize: 16}}>{device}</Text>
                                    </TouchableOpacity>
                                )
                            }) :
                            <Text style={{fontSize: 18, fontWeight:'bold'}}>No online devices</Text>
                    }
                </ScrollView>
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
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    bottomContainer: {
        flex: 1,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    titleContainer: {
        // backgroundColor: '#183fc8',
        width: vw(65),
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },

    connectionContainer: {
        // backgroundColor: 'green',
        width: 250,
        height: 60,
        paddingLeft: 15,
        paddingRight: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
})

export default ConnectionsScreen;
