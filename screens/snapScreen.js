import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, Platform} from 'react-native';
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

function SnapScreen({route, navigation}) {

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
            navigateNext();
        }
    }

    const navigateNext = () => {
        switch (snapMode) {
            case 'Text':
                console.log('Go to Text Select');
                navigation.navigate('TextSelect', {image: image});
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


    //Post Image to Server
    const getOCRResults = async () => {

        console.log('photo', image);
        //fileUpload(image);
        //await postData('https://www.google.com.sg/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');

        let uploadResponse, uploadResult;
        try {
            const resizedImage = await ImageManipulator.manipulateAsync(
                image.uri,
                [{resize: {width: 1000}}],
                {compress: 0.6, format: 'jpeg'},
            );
            console.log('downsized photo', resizedImage);
            // uploadResponse = await uploadImageAsync('https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/6e/f9/T-L-5065-200-Common-Words-List_ver_3.jpg');
            uploadResponse = await uploadImageAsync(resizedImage.uri);
            uploadResult = await uploadResponse.json();
        } catch (e) {
            // console.log({uploadResponse});
            // console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        }
        // console.log('response: ');
        // console.log({uploadResponse});
        console.log('results: ');
        console.log({uploadResult});


    }

    async function uploadImageAsync(uri) {
        console.log('uri: ' + uri);
        let apiUrl = 'http://byteus.me:8000/ocr';
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        return fetch(apiUrl, options);
    }

    // const postData = async (props) => {
    //     const FormData = require('form-data');
    //     //const base64 = await FileSystem.readAsStringAsync(props.uri, { encoding: 'base64' });
    //     const formData = new FormData();
    //     //formData.append('file', props);
    //
    //     const config = {headers: {'Content-Type': 'multipart/form-data'}};
    //     const res = await axios.post('http://byteus.me:8000/ocr', formData, config)
    //         .then(function (response) {
    //             //handle success
    //             console.log('Success');
    //             console.log(response);
    //         })
    //         .catch(function (response) {
    //             //handle error
    //             console.log('Error');
    //             console.log(response);
    //         });
    //     console.log(res);
    // }


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
    camera: {
        // flex: 1,
        width: vw(100),
        height: vw(133),
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
