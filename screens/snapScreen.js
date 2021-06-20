import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Header from "../components/header";
import colors from "../common/colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import commonStyle from "../common/commonStyles";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imageFrameDimension = () => {
    let maxWidth = Dimensions.get('window').width;
    let maxHeight = Dimensions.get('window').height - 70 - 120;
    let imageRatio = 4 / 3;
    if ((maxHeight / maxWidth) < imageRatio) {
        maxWidth = maxHeight / imageRatio;
        // console.log('ipad')
    }
    else {
        maxHeight = maxWidth * imageRatio;
        // console.log('phone')
    }
    // console.log(maxWidth + " " + maxHeight)
    return {maxWidth, maxHeight};
}

function SnapScreen({route, navigation}) {
    console.log(imageFrameDimension().maxHeight, imageFrameDimension().maxWidth);
    const {snapMode} = route.params;

    //Shared Variables
    let image = null;

    //Image Picker
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            try {
                // await AsyncStorage.setItem('flashVal','2');
                let val = await AsyncStorage.getItem('flashVal');
                console.log('get flashval: ' + val);
                if (val != null) {
                    setFlashValue(parseInt(val));
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            image = result;
            navigateNext();
        }

    };

    // Camera
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.auto);

    const flashOptions = (value) => {
        switch (value) {
            case 0:
                return 'flash-auto';
            case 1:
                return 'flash-on';
            case 2:
                return 'flash-off';
        }
    }
    const [flashValue, setFlashValue] = useState(0);
    const [flashIcon, setFlashIcon] = useState(flashOptions(flashValue));
    useEffect(() => {
        // setFlashIcon(flashOptions(flashValue))
        console.log('flashValue: ' + flashValue);
        setFlashIcon(flashOptions(flashValue));
        let mode = null;
        switch (flashValue) {
            case 0:
                mode = Camera.Constants.FlashMode.auto;
                break;
            case 1:
                mode = Camera.Constants.FlashMode.on;
                break;
            case 2:
                mode = Camera.Constants.FlashMode.off;
                break;
        }
        setFlashMode(mode);
    }, [flashValue]);
    useEffect(() => {
        console.log('flashIcon: ' + flashIcon);
    }, [flashIcon]);


    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    // UI Actions
    const cameraFlashAction = () => {
        console.log('Pressed Flash');
        let newFlashValue = (flashValue + 1) % 3;
        setFlashValue(newFlashValue);
        (async () => {
            try {
                await AsyncStorage.setItem('flashVal', newFlashValue.toString());
                console.log('stored flashVal: ' + newFlashValue);
            } catch (e) {
                console.log(e);
            }
        })();
    }
    const imagePickerAction = async () => {
        console.log('Pressed Image Picker');
        await pickImage();
    }
    const snapButtonAction = async () => {
        console.log('Pressed Snap');

        if (cameraRef) {
            image = await cameraRef.takePictureAsync();
            // await getOCRResults();
            await navigateNext();
        }
    }

    const navigateNext = async () => {
        switch (snapMode) {
            case 'Text':
                console.log('Go to Text Select');
                navigation.navigate('TextSelect', {image: await resizeImage(1200, image)});
                break;
            case 'Image':
                console.log('Go to Image Edit');
                navigation.push('ImageEdit', {image: image});
                break;
            case 'PDF':
                console.log('Go to PDF Edit');
                navigation.push('PdfEdit', {image: image});
                break;
            default:
                console.log('No mode selected!');
        }
    }

    const resizeImage = async (width, image) => {
        const resizedImage = await ImageManipulator.manipulateAsync(
            image.uri,
            [{resize: {width: width}}],
            {compress: 0.6, format: 'jpeg'},
        );
        return resizedImage;
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} text={'Snap ' + snapMode} backEnabled={true}/>

            <View style={styles.contentContainer}>
                {
                    <Camera
                        style={styles.camera}
                        type={type}
                        flashMode={flashMode}
                        useCamera2Api={false}
                        ref={(ref) => {
                            setCameraRef(ref);
                        }}
                    />
                }

            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.adjustmentButton} onPress={cameraFlashAction}>
                    <MaterialIcon name={flashIcon} size={40}/>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, styles.snapButton]}
                                  onPress={snapButtonAction}>
                    <View style={styles.snapButtonRowContainer}>
                        <MaterialIcon name={'camera'} size={40} color={colors.iconLight}/>
                        <Text style={commonStyle.commonTextStyleLight}>Snap</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adjustmentButton} onPress={imagePickerAction}>
                    <MaterialIcon name={'add-photo-alternate'} size={40}/>
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
    cameraContainer: {
        flex: 1,
    },
    camera: {
        // flex: 1,
        // width: vw(100),
        // height: vw(100),
        width: imageFrameDimension().maxWidth,
        height: imageFrameDimension().maxHeight,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: colors.color3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        height: 120,
        // backgroundColor: '#183fc8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // marginBottom: 40,
    },
    snapButton: {
        width: 180,
    },
    snapButtonRowContainer: {
        // backgroundColor: 'yellow',
        width: 180,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 40,
    },
    adjustmentButton: {
        // backgroundColor: colors.primaryColor,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SnapScreen;
