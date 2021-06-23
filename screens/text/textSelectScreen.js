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
import Svg, {Circle, Rect, Polygon, Image, G} from "react-native-svg";
import BoundingBox from "../../components/ocrBoundingBox";
import {useDispatch, useSelector} from "react-redux";
import {addAll, removeAll} from "../../store/actions/textSelectActions";
import authenticationService from "../../services/authenticationService";
import services from "../../services/services";

const imageFrameDimension = () => {
    let maxWidth = Dimensions.get('window').width;
    let maxHeight = Dimensions.get('window').height - 70 - 170;
    // console.log(maxWidth + " " + maxHeight)
    return {maxWidth, maxHeight};
}
const ocrEnabled = true;

function TextSelectScreen({route, navigation}) {
    const {image} = route.params;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [ocrResults, setOcrResults] = useState([]);

    const [selectAllState, setSelectAllState] = useState(true);
    const selectedText = useSelector(state => state.textSelect);
    const account = useSelector(state => state.account);

    const imageWidth = image.width;
    const imageHeight = image.height;

    useEffect(() => {
        dispatch(removeAll());
        console.log('Fetching OCR Results...')
        setIsLoading(true);
        (async () => {
            if (ocrEnabled) await getOCRResults();
            setIsLoading(false);
        })()
    }, [])

    const previewButtonAction = () => {
        let processedText = '';
        // text = ocrResults.map(e => e.text).join(' ');
        // text=ocrResults.join(' ');
        processedText = selectedText.map(e => ocrResults[e].text).join('\n\n');
        // console.log(ocrResults);
        console.log('/////////// Selected Text ///////////////');
        console.log(processedText);
        navigation.push('TextConfirmation', {text: processedText});
    }

    //Post Image to Server
    const getOCRResults = async () => {
        console.log('photo', image);
        let uploadResult;
        let uri = image.uri;
        // let uri = 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/6e/f9/T-L-5065-200-Common-Words-List_ver_3.jpg';
        uploadResult = await services.ocr(uri, account.userToken);
        if(uploadResult!==null) setOcrResults(uploadResult);
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
                            <Svg height={imageFrameDimension().maxHeight} width={imageFrameDimension().maxWidth}
                                 viewBox={"0 0 " + imageWidth + " " + imageHeight}>
                                <Image width={imageWidth} height={imageHeight} href={image.uri}/>
                                {
                                    ocrResults.length !== 0 ?
                                        ocrResults.map(e => <BoundingBox bb={e.bb} imageHeight={imageHeight}
                                                                         imageWidth={imageWidth}
                                                                         index={ocrResults.indexOf(e)}
                                                                         key={ocrResults.indexOf(e)}/>) : null
                                }
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={[styles.controlButton]} onPress={selectAllAction}>
                            <Text
                                style={commonStyle.commonTextStyleDark}>{selectAllState ? 'Select All' : 'Unselect All'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, {
                            marginBottom: 20,
                            backgroundColor: selectedText.length === 0 ? colors.grey : colors.primaryColor
                        }]}
                                          onPress={previewButtonAction} disabled={selectedText.length === 0}>
                            <Text
                                style={commonStyle.commonTextStyleLight}>{selectedText.length === 0 ? 'Please select text' : 'Preview'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );

}


const styles = StyleSheet.create(
    {
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
            height: 170,
            // backgroundColor: '#183fc8',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        imageContainer: {
            backgroundColor: colors.color3,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            // borderRadius: 10,
        },
        controlsContainer: {
            // backgroundColor: colors.color3,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 80,
        }
        ,
        controlButton: {
            backgroundColor: colors.color3,
            width: 180,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
        },
    }
)

export default TextSelectScreen;
