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
    Alert, Image, Dimensions, TextInput
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vw} from "react-native-expo-viewport-units";
import {useSelector} from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {setCloudHistory, setLocalHistory} from "../../store/actions/chatActions";
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
        if (!fromHistory) saveToHistory();
        navigation.navigate('Home');
    }
    const saveButtonAction = () => {
        if (!fromHistory) saveToHistory();
        navigation.navigate('Home');
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
        // console.log(image);
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Preview Image'} backEnabled={true} cancelEnabled={true}/>
            <View style={styles.selectDeviceContainer}>
                <TouchableOpacity style={styles.selectDeviceButton} onPress={selectDevice}>
                    <MaterialIcon name={'computer'} size={30}/>
                    <Text style={[commonStyle.commonTextStyleDark, {
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 15
                    }]}>{chat.selectedDevice}</Text>
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
