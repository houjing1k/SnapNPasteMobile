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
import Svg, {Circle, Rect, Polygon, Image, G} from "react-native-svg";
import BoundingBox from "../../components/ocrBoundingBox";
import {SelectionContext} from "../../context/context";
import {useDispatch, useSelector} from "react-redux";
import {addAll, removeAll} from "../../actions/textSelectActions";

const imageFrameWidth = Dimensions.get('window').width;
const imageFrameHeight = imageFrameWidth / 3 * 4;

function TextSelectScreen({route, navigation}) {
    const {image} = route.params;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [ocrResults, setOcrResults] = useState([]);

    const [selectAllState, setSelectAllState] = useState(true);
    const selectedText = useSelector(state=>state.textSelect);

    const imageWidth = image.width;
    const imageHeight = image.height;

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
        let processedText = '';
        // text = ocrResults.map(e => e.text).join(' ');
        // text=ocrResults.join(' ');
        processedText = selectedText.map(e => ocrResults[e].text).join(' ');
        // console.log(ocrResults);
        console.log('/////////// Selected Text ///////////////');
        console.log(processedText);
        navigation.push('TextConfirmation', {text: processedText});
    }

    //Post Image to Server
    const getOCRResults = async () => {
        console.log('photo', image);

        let uploadResponse, uploadResult;
        try {
            // const resizedImage = await ImageManipulator.manipulateAsync(
            //     image.uri,
            //     [{resize: {width: imageWidth}}],
            //     {compress: 0.6, format: 'jpeg'},
            // );
            // console.log('downsized photo', resizedImage);
            // uploadResponse = await uploadImageAsync('https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/6e/f9/T-L-5065-200-Common-Words-List_ver_3.jpg');
            uploadResponse = await uploadImageAsync(image.uri);
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

    const selectAllAction = () => {
        if (selectAllState) {
            //Select all
            dispatch(addAll(ocrResults.length));
        } else {
            //Deselect all
            dispatch(removeAll());
        }
        setSelectAllState(!selectAllState);
    }


    const Loading = () => {
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
            {isLoading ? <Loading/> :
                <View style={styles.container}>
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
                        <View style={styles.imageContainer}>
                            <Svg height={imageFrameHeight} width={imageFrameWidth}
                                 viewBox={"0 0 " + imageWidth + " " + imageHeight}>
                                <Image width={imageWidth} height={imageHeight} href={image.uri}/>
                                {ocrResults.map(e => <BoundingBox bb={e.bb} index={ocrResults.indexOf(e)}
                                                                  key={ocrResults.indexOf(e)}/>)}
                            </Svg>
                        </View>
                        <View style={styles.controlsContainer}>
                            <TouchableOpacity style={[styles.controlButton]} onPress={selectAllAction}>
                                <Text
                                    style={commonStyle.commonTextStyleDark}>{selectAllState ? 'Select All' : 'Unselect All'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow]}
                                          onPress={previewButtonAction}>
                            <Text style={commonStyle.commonTextStyleLight}>Preview</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        // backgroundColor: colors.color3,
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
    imageContainer: {
        backgroundColor: colors.color3,
        alignItems: 'center',
        justifyContent: 'center',
        height: imageFrameHeight,
        borderRadius: 10,
    },
    controlsContainer: {
        // backgroundColor: colors.color3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1,
    },
    controlButton: {
        backgroundColor: colors.color3,
        width: 180,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default TextSelectScreen;
