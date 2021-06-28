import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Alert, Image, Dimensions, TextInput
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vw} from "react-native-expo-viewport-units";
import {useSelector} from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {sendText, setCloudHistory, setLocalHistory} from "../../store/actions/chatActions";
import * as FileSystem from 'expo-file-system';
import filenameGenerator from "../../components/filenameGenerator";

const imageFrameDimension = () => {
    let maxWidth = Dimensions.get('window').width;
    let maxHeight = Dimensions.get('window').height - 70 - 275;
    // console.log(maxWidth + " " + maxHeight)
    return {maxWidth, maxHeight};
}

function ImageConfirmationScreen({route, navigation}) {

    const {image, fromHistory} = route.params;
    const chat = useSelector(state => state.chat);
    const account = useSelector(state => state.account);
    const [filename, setFilename] = useState(filenameGenerator())

    const pasteButtonAction = () => {
        if (chat.isSelectedDeviceOnline) {
            // Send Image Function
            // sendImage(image, chat);
            Alert.alert(
                "Feature coming soon",
                "Your image wont be pasted to PC, but it is saved in your history.",
                [{
                    text: "OK", onPress: () => {
                        navigation.navigate('Home');
                    }
                }]);
        } else{
            Alert.alert(
                "Saved to history",
                "",
                [{
                    text: "OK", onPress: () => {
                        navigation.navigate('Home');
                    }
                }]);
        }
        if (!fromHistory) saveToHistory();
    }
    const saveButtonAction = () => {
        if (chat.isSelectedDeviceOnline) {
            // Save Image Function
            // saveImage(image, chat);
            Alert.alert(
                "Feature coming soon",
                "Your image wont be saved to PC, but it is saved in your history.",
                [{
                    text: "OK", onPress: () => {
                        navigation.navigate('Home');
                    }
                }]);
        } else{
            Alert.alert(
                "Saved to history",
                "",
                [{
                    text: "OK", onPress: () => {
                        navigation.navigate('Home');
                    }
                }]);
        }
        if (!fromHistory) saveToHistory();
    }
    const saveToHistory = async () => {
        const base64 = await FileSystem.readAsStringAsync(image.uri, {encoding: 'base64'});
        // console.log(base64);
        // setLocalHistory('IMAGE', JSON.stringify(image));
        setCloudHistory('IMAGE', base64, account);
    }

    const selectDevice = () => {
        navigation.push('Connections');
    }

    useEffect(() => {
        console.log(image);
    }, [])


    const PasteContainer=()=>{
        if(chat.isSelectedDeviceOnline)
            return(
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle]}
                                      onPress={saveButtonAction}>
                        <MaterialIcon name={'save'} size={30} color={colors.iconLight}/>
                        <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Save to PC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle]}
                                      onPress={pasteButtonAction}>
                        <MaterialIcon name={'content-paste'} size={30} color={colors.iconLight}/>
                        <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Paste to PC</Text>
                    </TouchableOpacity>
                </View>
            )
        else if(!chat.isSelectedDeviceOnline&&fromHistory)
            return(
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle, {backgroundColor:colors.grey}]}
                                      disabled={true}>
                        <MaterialIcon name={'content-paste'} size={30} color={colors.iconLight}/>
                        <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Not Available</Text>
                    </TouchableOpacity>
                </View>
            )
        else if(!chat.isSelectedDeviceOnline&&!fromHistory)
            return(
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.buttonStyle]}
                                      onPress={pasteButtonAction}>
                        <MaterialIcon name={'save'} size={30} color={colors.iconLight}/>
                        <Text style={[commonStyle.commonTextStyleLight, {marginLeft: 15}]}>Save to History</Text>
                    </TouchableOpacity>
                </View>
            )
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==="ios"? "padding":"height"}>
            <StatusBar/>
            <Header navigation={navigation} text={'Preview Image'} backEnabled={true} cancelEnabled={true}/>
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
                <Image source={image} style={styles.image} resizeMethod={"auto"} resizeMode={'contain'}/>
            </View>
            <View style={styles.filenameInputContainer}>
                <View style={styles.filenameInputSet}>
                    <MaterialIcon name={'attach-file'} size={30}/>
                    <TextInput style={styles.filenameInput} placeholder={'File Name'} value={filename}
                               onChangeText={(text) => setFilename(text)}/>
                </View>
            </View>
            <PasteContainer/>

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
        backgroundColor: colors.color3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        width: imageFrameDimension().maxWidth - 30,
        borderWidth: 2,
        borderColor: colors.iconDark,
        borderRadius: 20,
        overflow: 'hidden',
    },
    bottomContainer: {
        // flex: 1,
        // backgroundColor: '#183fc8',
        height: 150,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    buttonStyle: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    textContainer: {},
    image: {
        width: imageFrameDimension().maxWidth - 30,
        height: imageFrameDimension().maxHeight,
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
        width: imageFrameDimension().maxWidth - 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filenameInputContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 50,
    },
    filenameInputSet: {
        backgroundColor: colors.color3,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: imageFrameDimension().maxWidth - 30,
        paddingHorizontal: 20,
    },
    filenameInput: {
        width: 250,
        fontSize: 20,
        marginLeft: 10,
        marginRight: 15,
        textAlign: 'center',
        flex: 1,
    },


})

export default ImageConfirmationScreen;
