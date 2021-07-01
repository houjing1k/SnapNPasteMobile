import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Alert, ToastAndroid, Platform
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vw} from "react-native-expo-viewport-units";
import {useSelector} from "react-redux";
import {sendDataToPC, setCloudHistory, setLocalHistory} from "../../store/actions/chatActions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import services from "../../services/services";
import * as FileSystem from "expo-file-system";

function TextConfirmationScreen({route, navigation}) {

    const account = useSelector(state => state.account);
    const {text, fromHistory} = route.params;
    const chat = useSelector(state => state.chat);

    const pasteButtonAction = async() => {
        if (chat.isSelectedDeviceOnline) {
            sendDataToPC(text, chat);

            if(Platform.OS==="ios") {
                Alert.alert(
                    "Text Pasted to PC!",
                    "",
                    [{
                        text: "OK", onPress: () => {
                            navigation.navigate('Home');
                        }
                    }])
            }else{
                ToastAndroid.show('Text Pasted to PC!', ToastAndroid.SHORT);
                navigation.navigate('Home');
            }
        } else{
            if(Platform.OS==="ios") {
                Alert.alert(
                    "Saved to history",
                    "",
                    [{
                        text: "OK", onPress: () => {
                            navigation.navigate('Home');
                        }
                    }])
            }else{
                ToastAndroid.show('Saved to history', ToastAndroid.SHORT);
                navigation.navigate('Home');
            }
        }
        if (!fromHistory) saveToHistory();
    }
    const saveToHistory = async () => {
        // setLocalHistory('TEXT', text, account);
        setCloudHistory('TEXT', text, account);
    }

    const selectDevice = () => {
        navigation.push('Connections');
    }

    const PasteButton=()=>{
        if(chat.isSelectedDeviceOnline)
            return(
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle]}
                                  onPress={pasteButtonAction}>
                    <MaterialIcon name={'content-paste'} size={30} color={colors.iconLight}/>
                    <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Paste to PC</Text>
                </TouchableOpacity>
            )
        else if(!chat.isSelectedDeviceOnline&&fromHistory)
            return(
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle, {backgroundColor: colors.grey}]}
                                  disabled={true}>
                    <MaterialIcon name={'content-paste'} size={30} color={colors.iconLight}/>
                    <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Not available</Text>
                </TouchableOpacity>
            )
        else if(!chat.isSelectedDeviceOnline&&!fromHistory)
            return(
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle]}
                                  onPress={pasteButtonAction}>
                    <MaterialIcon name={'save'} size={30} color={colors.iconLight}/>
                    <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Save to History</Text>
                </TouchableOpacity>
            )
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Preview Text'} backEnabled={true} cancelEnabled={true}/>
            <View style={styles.selectDeviceContainer}>
                <TouchableOpacity style={styles.selectDeviceButton} onPress={selectDevice}>
                    <MaterialIcon name={'computer'} size={30}/>
                    <Text style={[commonStyle.commonTextStyleDark, {
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 15
                    }]}>{chat.isSelectedDeviceOnline ? chat.selectedDevice : 'Device not online'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>{text}</Text>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <PasteButton/>
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
        flex: 1,
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        // width: vw(100),
        padding: 20,
        borderWidth: 2,
        borderColor: colors.iconDark,
        borderRadius: 20,
    },
    bottomContainer: {
        // flex: 1,
        // backgroundColor: '#183fc8',
        height: 120,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    textContainer: {},
    text: {
        fontSize: 20,
    },
    selectDeviceContainer: {
        // backgroundColor: '#D34c5c',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectDeviceButton: {
        backgroundColor: colors.color3,
        flex: 1,
        flexDirection: 'row',
        // borderColor: 'black',
        // borderWidth: 2,
        borderRadius: 20,
        marginBottom: 10,
        width: vw(100) - 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default TextConfirmationScreen;
