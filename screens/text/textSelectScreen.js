import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,

    ActivityIndicator, ImageBackground, Dimensions
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vh, vw} from "react-native-expo-viewport-units";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Canvas} from "konva/lib/Canvas";
import Svg, {Circle, Rect, Polygon, Image, G} from "react-native-svg";
import BoundingBox from "../../components/ocrBoundingBox";
import {useSelector} from "react-redux";
import {SelectionContext} from "../../context/context";

function TextSelectScreen({route, navigation}) {
    const {image} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [ocrResults, setOcrResults] = useState([]);
    const [selectedText, setSelectedText] = useContext(SelectionContext);

    const imageFrameWidth = Dimensions.get('window').width;
    const imageFrameHeight = imageFrameWidth / 3 * 4;
    const imageWidth = 1200;
    const imageHeight = 1600;

    useEffect(() => {
        console.log('Fetching OCR Results...')
        setIsLoading(true);
        (async () => {
            await getOCRResults();
            setIsLoading(false);
        })()
        console.log('imageFrameWidth: ' + imageFrameWidth);
        console.log('imageWidth: ' + image.width);
    }, [])

    const previewButtonAction = () => {
        let text = '';
        // text = ocrResults.map(e => e.text).join(' ');
        // text=ocrResults.join(' ');
        text = selectedText.map(e => ocrResults[e].text).join(' ');

        // console.log(ocrResults);
        console.log('/////////// Selected Text ///////////////');
        console.log(text);
        navigation.push('TextConfirmation', {text: text});
    }

    //Post Image to Server
    const getOCRResults = async () => {
        console.log('photo', image);

        let uploadResponse, uploadResult;
        try {
            const resizedImage = await ImageManipulator.manipulateAsync(
                image.uri,
                [{resize: {width: imageWidth}}],
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
        // console.log('results: ');
        // console.log({uploadResult});
        setOcrResults(uploadResult);
    }

    async function uploadImageAsync(uri) {
        console.log('uri: ' + uri);
        let apiUrl = 'http://byteus.me:8000/ocrfull';
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
            <View style={[styles.contentContainer]}>
                {/*<View>*/}
                {/*    <Image source={{uri: image.uri}}*/}
                {/*           style={{*/}
                {/*               width: imageFrameWidth,*/}
                {/*               height: imageFrameHeight,*/}
                {/*               resizeMode: "contain",*/}
                {/*               backgroundColor: 'yellow'*/}
                {/*           }}>*/}
                {/*    </Image>*/}
                {/*</View>*/}
                <View>
                    <Svg height={imageFrameHeight} width={imageFrameWidth} viewBox="0 0 1200 1600">
                        <Image width={1200} height={1600} href={image.uri}/>
                        {ocrResults.map(e => <BoundingBox bb={e.bb} index={ocrResults.indexOf(e)} key={ocrResults.indexOf(e)}/>)}
                    </Svg>
                </View>
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
        justifyContent: 'flex-start'
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
