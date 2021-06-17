import React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import colors from "../common/colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import commonStyle from "../common/commonStyles";

function HomeScreen({navigation}) {

    const isConnected = false;

    const Header = () => {
        const manageAccount = () => {
            navigation.push('Account');
            console.log("Pressed Profile");
        }
        const ConnectionStatus = () => {
            if (isConnected) {
                return (
                    <View style={headerStyles.connectionIconContainer}>
                        <TouchableOpacity
                            style={[headerStyles.connectionIconButton, {backgroundColor: '#A2EF95'}, commonStyle.dropShadow]}>
                            <MaterialIcon name={'link'} size={45}/>
                        </TouchableOpacity>
                    </View>
                );
            } else return (
                <View style={headerStyles.connectionIconContainer}>
                    <TouchableOpacity
                        style={[headerStyles.connectionIconButton, {backgroundColor: '#EF9595'}, commonStyle.dropShadow]}
                        disabled={true}>
                        <MaterialIcon name={'link-off'} size={45}/>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={headerStyles.container}>
                <View style={headerStyles.manageAccountButtonContainer}>
                    <TouchableOpacity style={[headerStyles.manageAccountButton, commonStyle.dropShadow]}
                                      onPress={manageAccount}>
                        <MaterialIcon name={'account-circle'} size={45}/>
                    </TouchableOpacity>
                </View>
                <View style={headerStyles.centerContainer}>
                    <Text style={headerStyles.text}>Snap-N-Paste</Text>
                </View>
                <ConnectionStatus/>
            </View>
        );
    }

    const SnapItem = ({iconName, text, isLocked, onPressAction}) => {
        const LockIcon = () => {
            if (isLocked) {
                return (
                    <MaterialIcon name={'lock'} size={25}/>
                );
            } else return null;
        }

        return (
            <TouchableOpacity
                style={[styles.snapItemButton, commonStyle.dropShadow, isLocked ? {backgroundColor: colors.color4} : '']}
                disabled={isLocked} onPress={onPressAction}>
                <View style={styles.snapItemIconContainer}>
                    <MaterialIcon name={iconName} size={45} style={styles.inputIcon}/>
                </View>
                <Text style={styles.snapItemText}>{text}</Text>
                <View style={styles.snapItemLockedIconContainer}>
                    <LockIcon/>
                </View>

            </TouchableOpacity>
        );
    }

    const SnapItemDual = ({iconName, text, isLocked, onPressAction}) => {
        const LockIcon = () => {
            if (isLocked) {
                return (
                    <MaterialIcon name={'lock'} size={25}/>
                );
            } else return null;
        }

        return (
            <TouchableOpacity
                style={[styles.snapItemButton, commonStyle.dropShadow, isLocked ? {backgroundColor: colors.color4} : '']}
                disabled={isLocked} onPress={onPressAction}>
                <View style={styles.snapItemIconContainer}>
                    <MaterialIcon name={iconName} size={45} style={styles.inputIcon}/>
                </View>
                <Text style={styles.snapItemText}>{text}</Text>
                <View style={styles.snapItemLockedIconContainer}>
                    <LockIcon/>
                </View>

            </TouchableOpacity>
        );
    }

    const snapItemList = [
        {
            iconName: 'format-size',
            text: 'Text',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Text'}),
        },
        {
            iconName: 'format-size',
            text: 'Text',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Text'}),
        },
        {
            iconName: 'format-size',
            text: 'Text',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Text'}),
        },
        {
            iconName: 'format-size',
            text: 'Text',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Text'}),
        },
    ]

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header/>

            <View style={styles.connectionStatusContainer}>
                <TouchableOpacity style={[styles.connectionStatusButton, commonStyle.dropShadow]}
                                  onPress={() => navigation.push('Connections')}>
                    <Text style={styles.connectionStatusStaticText}>Pasting to: </Text>
                    <View style={styles.connectionStatusDivider}/>
                    <Text style={styles.connectionStatusDynamicText}>Kenny's Laptop</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <SnapItem text={'Text'} iconName={'format-size'} isLocked={false}
                          onPressAction={() => navigation.push('Snap', {snapMode: 'Text'})}/>
                <SnapItem text={'Image'} iconName={'image'} isLocked={false}
                          onPressAction={() => navigation.push('Snap', {snapMode: 'Image'})}/>
                <SnapItem text={'PDF'} iconName={'description'} isLocked={false}
                          onPressAction={() => navigation.push('Snap', {snapMode: 'PDF'})}/>
                <SnapItem text={'Signature'} iconName={'edit'} isLocked={true}/>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.historyButton} onPress={() => navigation.push('History')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <MaterialIcon name={'assignment'} size={30} color={colors.iconDark}/>
                        <Text style={styles.historyButtonText}>History</Text>
                    </View>
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
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    historyButton: {
        backgroundColor: colors.color3,
        width: 170,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 12,
    },
    historyButtonText: {
        fontSize: 15,
        marginLeft: 10,
    },
    connectionStatusContainer: {
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectionStatusButton: {
        backgroundColor: colors.color3,
        alignItems: 'center',
        width: 330,
        height: 65,
        borderRadius: 15,
        marginVertical: 15,
        marginBottom: 30,
        padding: 5,
    },
    connectionStatusStaticText: {
        fontSize: 13,
    },
    connectionStatusDynamicText: {
        fontSize: 22,
    },
    connectionStatusDivider: {
        width: 280,
        marginVertical: 3,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },
    snapItemButton: {
        backgroundColor: colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 330,
        height: 'auto',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
    },
    snapItemIconContainer: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    snapItemIcon: {},
    snapItemText: {
        fontSize: 22,
    },
    snapItemLockedIconContainer: {
        width: 50,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})

const headerStyles = StyleSheet.create({
    container: {
        // backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        marginTop: 15,
    },
    manageAccountButtonContainer: {
        // backgroundColor: '#123462',
        flexDirection: 'row',
    },
    centerContainer: {
        // backgroundColor: '#833462',
        justifyContent: 'center'
    },
    connectionIconContainer: {
        // backgroundColor: '#fc3462',
        flexDirection: 'row-reverse',
    },
    manageAccountButton: {
        width: 60,
        height: 60,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        margin: 10,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectionIconButton: {
        width: 60,
        height: 60,
        backgroundColor: 'grey',
        borderRadius: 30,
        margin: 10,
        marginRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
})

export default HomeScreen;
