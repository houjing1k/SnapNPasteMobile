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
import authenticationService from "../../services/authenticationService";
import services from "../../services/services";
import Loading from "../../components/Loading";

const imageFrameDimension = () => {
    let maxWidth = Dimensions.get('window').width;
    let maxHeight = Dimensions.get('window').height - 70 - 100 - 120;
    // console.log(maxWidth + " " + maxHeight)
    return {maxWidth, maxHeight};
}

function ImageEditScreen({route, navigation}) {
    const {image} = route.params;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [manipulatedImage, setManipulatedImage] = useState(image);

    const account = useSelector(state => state.account);

    const imageWidth = image.width;
    const imageHeight = image.height;

    useEffect(() => {
    }, [])

    const previewButtonAction = () => {
        navigation.push('ImageConfirmation', {image: manipulatedImage, fromHistory: false});
    }


    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Edit Image'} backEnabled={true} cancelEnabled={true}/>
            {isLoading ? <Loading text={'Loading'}/> :
                <View style={styles.container}>
                    <View style={[styles.contentContainer]}>
                        <View style={styles.imageContainer}>
                            <Svg height={imageFrameDimension().maxHeight} width={imageFrameDimension().maxWidth}
                                 viewBox={"0 0 " + imageWidth + " " + imageHeight}>
                                <Image width={imageWidth} height={imageHeight} href={image.uri}/>
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.controlsContainer}>

                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, {
                            marginBottom: 20,
                            backgroundColor: colors.primaryColor
                        }]}
                                          onPress={previewButtonAction}>
                            <Text
                                style={commonStyle.commonTextStyleLight}>{'Proceed'}</Text>
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
            height: 100,
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
            // backgroundColor: '#25f375',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 120,
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

export default ImageEditScreen;
