import React, {useEffect, useMemo, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vh, vw} from "react-native-expo-viewport-units";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TextSelectScreen({route, navigation}) {
    const {image} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [ocrResults, setOcrResults] = useState([]);
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        console.log('useeffect called')
        setIsLoading(true);
        setTimeout(async () => {
            await getOCRResults();
            setIsLoading(false);
        }, 50);
    }, [])

    const previewButtonAction = () => {
        let text = '';
        // for (let i = 0; i < ocrResults.length; i++) {
        //     text.concat(' ' + ocrResults[i]);
        // }
        text=ocrResults.join(' ');
        console.log('//////////////////');
        console.log(ocrResults);
        console.log(text);
        navigation.push('TextConfirmation', {text: text});
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

        console.log(uploadResult[1])
        setOcrResults(uploadResult);
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

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.iconDark}/>
                <Text style={[commonStyle.commonTextStyleDark, {marginTop: 15}]}>Getting OCR Results</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Select Text'} backEnabled={true} cancelEnabled={true}/>
            <View style={styles.contentContainer}>
                <Image source={{uri: image.uri}} style={{width: vw(100), height: vw(150), resizeMode: "contain"}}/>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow]}
                                  onPress={previewButtonAction}>
                    <Text style={commonStyle.commonTextStyleLight}>Preview</Text>
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
        justifyContent: 'center'
    },
    bottomContainer: {
        height: 120,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default TextSelectScreen;
