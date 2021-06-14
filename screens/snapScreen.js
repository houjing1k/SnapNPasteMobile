import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Camera } from 'expo-camera';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyles from "../common/commonStyles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

function SnapScreen({ route, navigation }) {

    const { snapMode } = route.params;

    const [hasPermission, setHasPermission] = useState(null);
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
        console.log('flashValue: '+flashValue);
        setFlashIcon(flashOptions(flashValue));
        switch (flashValue) {
            case 0:
                setFlashMode(Camera.Constants.FlashMode.auto);
                //setType(Camera.Constants.Type.back);
                break;
            case 1:
                setFlashMode(Camera.Constants.FlashMode.on);
                //setType(Camera.Constants.Type.front);
                break;
            case 2:
                setFlashMode(Camera.Constants.FlashMode.off);
                break;
        }
    }, [flashValue]);
    useEffect(() => {
        console.log('flashIcon: '+flashIcon);
    }, [flashIcon]);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const cameraFlashAction=()=>{
        console.log('Pressed Flash');
        setFlashValue((flashValue + 1) % 3);
    }
    const imagePickerAction=()=>{
        console.log('Pressed Image Picker');
        // navigation.navigate('Home')
    }
    const snapButtonAction = async () => {
        console.log('Pressed Snap');

        let photo=null;
        // if (this.camera) {
            //let photo = await this.camera.takePictureAsync();

            switch (snapMode) {
                case 'Text':
                    console.log('Go to Text Select');
                    navigation.push('TextSelect', {photo: photo} );
                    break;
                case 'Image':
                    console.log('Go to Image Edit');
                    navigation.push('ImageEdit', {photo: photo} );
                    break;
                case 'PDF':
                    console.log('Go to PDF Edit');
                    navigation.push('PdfEdit', {photo: photo} );
                    break;
                default:
                    console.log('No mode selected!');
            }
        // }

    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} text={'Snap '+ snapMode} backEnabled={true}/>

            <View style={styles.contentContainer}>
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flashMode}
                    useCamera2Api={true}
                    ref={ref => {this.camera = ref;}}
                />
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.adjustmentButton} onPress={cameraFlashAction}>
                    <MaterialIcon name={flashIcon} size={40}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snapButton} onPress={snapButtonAction}>
                    <View style={styles.snapButtonRowContainer}>
                        <MaterialIcon name={'camera'} size={40}/>
                        <Text style={styles.buttonText}>Snap</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adjustmentButton} onPress={imagePickerAction}>
                    <MaterialIcon name={'add-photo-alternate'} size={40}/>
                </TouchableOpacity>
            </View>

            {/*<View style={styles.buttonContainer}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={styles.button}*/}
            {/*        onPress={() => {*/}
            {/*            setType(*/}
            {/*                type === Camera.Constants.Type.back*/}
            {/*                    ? Camera.Constants.Type.front*/}
            {/*                    : Camera.Constants.Type.back*/}
            {/*            );*/}
            {/*        }}>*/}
            {/*        <Text style={styles.text.js}> Flip </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    );
}

// function SnapScreen({ navigation }) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <Text>Snap Screen</Text>
//           <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
//       </View>
//     );
//   }


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
        backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        height: 160,
        // backgroundColor: '#183fc8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 40,
    },
    snapButton: {
        backgroundColor: colors.primaryColor,
        width: 200,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        paddingRight: 20,
    },
    snapButtonRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: commonStyles.buttonLargeFontSize,
        marginLeft: 20,
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
