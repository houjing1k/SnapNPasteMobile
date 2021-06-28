import React, {useContext, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import colors from "../common/colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import commonStyle from "../common/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import authenticationService from "../services/authenticationService";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../context/context";
import {initialiseChat} from "../store/actions/chatActions";
import * as SecureStore from "expo-secure-store";
import {retrieveToken} from "../store/actions/accountActions";

function HomeScreen({navigation}) {

    const {getProfile} = useContext(AuthContext);

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const chat = useSelector(state => state.chat);
    // let isConnected = chat.isSelectedDeviceOnline;

    const printAcc = () => {
        // console.log(account);
        console.log(chat);
    }

    const snapItemList = [
        {
            iconName: 'format-size',
            text: 'Text',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Text'}),
        },
        {
            iconName: 'image',
            text: 'Images',
            isLocked: false,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Image'}),
        },
        {
            iconName: 'description',
            text: 'PDF',
            isLocked: true,
            onPressAction: () => navigation.push('Snap', {snapMode: 'PDF'}),
        },
        {
            iconName: 'edit',
            text: 'Signature',
            isLocked: true,
            onPressAction: () => navigation.push('Snap', {snapMode: 'Signature'}),
        },
        // {
        //     iconName: 'edit',
        //     text: 'PRINT ACC',
        //     isLocked: false,
        //     onPressAction: printAcc,
        // },
    ]

    useEffect(() => {
        (async () => {
            if (account.userToken != null && account.username == null) {
                console.log('fetching info...');
                await getProfile(account.userToken);
                // console.log('aaa')
                // printAcc();
            }
        })();
    }, [])

    useEffect(() => {
        // console.log('aaaa');
        // console.log(account);
        setTimeout(async () => {
            if (!chat.isInitialised && account.email !== null) {
                console.log('Initialising Chat...');
                console.log(account)
                await initialiseChat(dispatch, account);
            } else if (chat.isInitialised) {
                console.log('Chat already initialised');
            }
        }, 0);
        // (async ()=>{
        //     if (true) {
        //         console.log('ccccc');
        //         console.log(account)
        //         await initialiseChat(dispatch, account);
        //     } else {
        //         console.log('Chat already initialised');
        //     }
        //
        // })();
        // (async () => {
        //     console.log(chat);
        //     if (true) {
        //         console.log('Initialising Chat...');
        //         console.log(account)
        //         await initialiseChat(dispatch, account);
        //     } else {
        //         console.log('Chat already initialised');
        //     }
        // })();
    }, [account])


    const Header = () => {
        const manageAccount = () => {
            navigation.push('Account');
            // console.log("Pressed Profile");
        }
        const ConnectionStatus = () => {
            if (chat.isSelectedDeviceOnline) {
                return (
                    <View style={headerStyles.connectionIconContainer}>
                        <View
                            style={[headerStyles.connectionIconButton, {backgroundColor: '#A2EF95'}, commonStyle.dropShadow]}>
                            <MaterialIcon name={'link'} size={45}/>
                        </View>
                    </View>
                );
            } else return (
                <View style={headerStyles.connectionIconContainer}>
                    <View
                        style={[headerStyles.connectionIconButton, {backgroundColor: '#EF9595'}, commonStyle.dropShadow]}
                        disabled={true}>
                        <MaterialIcon name={'link-off'} size={40}/>
                    </View>
                </View>
            );
        }

        return (
            <View style={headerStyles.container}>
                <View style={headerStyles.manageAccountButtonContainer}>
                    <TouchableOpacity style={[headerStyles.manageAccountButton, commonStyle.dropShadow]}
                                      onPress={manageAccount}>
                        <Image source={account.profilePicture} style={headerStyles.profilePicture}/>
                        {/*<MaterialIcon name={'account-circle'} size={40}/>*/}
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
                    <MaterialIcon name={'lock'} size={25} color={colors.iconLight}/>
                );
            } else return null;
        }

        return (
            <View style={snapItemStyles.snapItemContainer}>
                <TouchableOpacity
                    style={[snapItemStyles.snapItemButton, commonStyle.dropShadow, isLocked ? {backgroundColor: colors.color4} : '']}
                    disabled={isLocked} onPress={onPressAction}>
                    <View style={snapItemStyles.snapItemIconContainer}>
                        <MaterialIcon name={iconName} size={45} color={colors.iconDark}
                                      style={snapItemStyles.inputIcon}/>
                    </View>
                    <View style={snapItemStyles.snapItemLockedIconContainer}>
                        <LockIcon/>
                    </View>
                </TouchableOpacity>
                <Text style={snapItemStyles.snapItemText}>{text}</Text>
            </View>
        );
    }

    const SnapItemGrid = ({itemList}) => {
        let list = [];
        let isEven = itemList.length % 2 === 0;
        let listRowSize = isEven ? itemList.length : itemList.length + 1;
        // console.log('list row size: ' + listRowSize);

        for (let i = 0; i < listRowSize; i += 2) {
            // console.log('item: ' + i);
            let firstItem = itemList[i];
            let secondItem = (i < listRowSize) ? itemList[i + 1] : itemList[i];
            list.push(
                <View key={i} style={{flexDirection: 'row'}}>
                    <SnapItem text={firstItem.text} iconName={firstItem.iconName} isLocked={firstItem.isLocked}
                              onPressAction={firstItem.onPressAction}/>
                    {
                        (i === listRowSize - 2 && !isEven) ?
                            <View/> :
                            <SnapItem text={secondItem.text} iconName={secondItem.iconName}
                                      isLocked={secondItem.isLocked}
                                      onPressAction={secondItem.onPressAction}/>
                    }
                </View>
            )
        }


        return (
            <View>
                {list}
            </View>
        )
    }


    const Footer = () => {
        return (
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.historyButton} onPress={() => navigation.push('History')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <MaterialIcon name={'assignment'} size={30} color={'#303030'}/>
                        <Text style={styles.historyButtonText}>History</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header/>

            <View style={styles.connectionStatusContainer}>
                <TouchableOpacity style={[styles.connectionStatusButton, commonStyle.dropShadow]}
                                  onPress={() => navigation.push('Connections')}>
                    <Text style={styles.connectionStatusStaticText}>Pasting to: </Text>
                    <View style={styles.connectionStatusDivider}/>
                    <Text
                        style={styles.connectionStatusDynamicText}>{chat.selectedDevice == null ? 'No Device Selected' : chat.selectedDevice}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <SnapItemGrid itemList={snapItemList}/>
            </ScrollView>

            <Footer/>

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
        // flex: 2,
        // minHeight: 800,
    },
    bottomContainer: {
        // flex: 1,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // height: 100,
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
        width: 300,
        height: 70,
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
        // backgroundColor: colors.primaryColor,
        // backgroundImage: account.profilePicture,
        borderRadius: 30,
        margin: 10,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture:{
        width:60,
        height:60,
        borderRadius: 30,
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

const snapItemStyles = StyleSheet.create({
    snapItemContainer: {
        // backgroundColor: 'green',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginHorizontal: 20,
    },
    snapItemButton: {
        backgroundColor: colors.primaryColor,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 130,
        borderRadius: 15,
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
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'normal',
        // backgroundColor: 'yellow'
    },
    snapItemLockedIconContainer: {
        // backgroundColor: 'orange',
        width: 130,
        height: 130,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        paddingRight: 10,
        paddingBottom: 10,
    },
})

export default HomeScreen;
