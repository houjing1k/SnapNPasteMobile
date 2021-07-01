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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import PerspectiveBoundingBox from "../../components/perspectiveBoundingBox";
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
    const [perspectiveBB, setPerspectiveBB] = useState([]);
    const [controlMode, setControlMode] = useState(null);
    const [perspectiveMode, setPerspectiveMode] = useState('AUTO');
    const [controlState, setControlState] = useState({
        perspective: false,
        rotate: 0,
    })

    const account = useSelector(state => state.account);

    const imageWidth = image.width;
    const imageHeight = image.height;
    const originalBB = [imageWidth, 0, imageWidth, imageHeight, 0, imageHeight, 0, 0,]

    useEffect(() => {
    }, [])

    const previewButtonAction = () => {
        navigation.push('ImageConfirmation', {image: manipulatedImage, fromHistory: false});
    }

    const comingSoon=()=>alert('Feature coming soon')

    const getPerspectiveBB = async () => {
        try {
            const jpegImage = await base64ToJpeg(image);
            const bb = await services.documentDetect(jpegImage.uri, account.userToken);
            // console.log(bb);
            // console.log(bb.bb);
            let toIntBB=[]
            bb.forEach(point=>toIntBB.push(Math.trunc(point)))
            console.log(toIntBB)
            setPerspectiveBB(toIntBB);
        } catch (e) {
            console.log('Failed')
        }
    }
    const resetPerspectiveBB = async () => {
        setPerspectiveBB(originalBB);
    }
    const applyPerspectiveWarp = async () => {
        if (JSON.stringify(perspectiveBB) === JSON.stringify(originalBB)) {
            console.log("No perspective change")
            setManipulatedImage(image)
        } else {
            try {
                console.log(perspectiveBB);
                if (perspectiveBB.length === 8) {
                    const jpegImage = await base64ToJpeg(image)
                    const warpedImage = await services.warpImage(jpegImage.uri, perspectiveBB, account.userToken);
                    // let image = new Image();
                    // image.src = 'data:image/png;base64,iVBORw0K...';
                    // document.body.appendChild(image);
                    // console.log(warpedImage.image.substring(0,100));
                    setManipulatedImage({uri:`data:image/jpg;base64,${warpedImage.image}`})
                }
                // console.log(bb.bb);
                // setPerspectiveBB(bb.bb);
            } catch (e) {
                console.log('Failed')
            }
        }
        setControlMode(null);
    }
    const base64ToJpeg = async (base64Image) => {
        const jpegImage = await ImageManipulator.manipulateAsync(
            base64Image.uri, [], {format: 'jpeg'},);
        return jpegImage;
    }

    useEffect(() => {

    }, [perspectiveMode])
    useEffect(() => {
        console.log(manipulatedImage.uri.substring(0,100))
    }, [manipulatedImage])


    const ImageControlPanel = () => {
        return (
            <View style={controlStyles.controlsContainer}>
                <View style={controlStyles.controlsTopContainer}>
                    <TouchableOpacity style={controlStyles.controlButton} onPress={() => setControlMode('PERSPECTIVE')}>
                        <MaterialIcon name={'settings-overscan'} size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={controlStyles.controlButton} onPress={() => setControlMode('B&W')}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>B/W</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={controlStyles.controlButton} onPress={() => setControlMode('ROTATE')}>
                        <MaterialIcon name={'rotate-90-degrees-ccw'} size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={controlStyles.controlButton}
                                      onPress={() => setControlMode('CROP_STRAIGHTEN')}>
                        <MaterialIcon name={'crop-rotate'} size={35}/>
                    </TouchableOpacity>
                </View>
                <BottomControl mode={controlMode}/>
            </View>
        )
    }

    const BottomControl = (props) => {
        // console.log(props.mode);
        switch (props.mode) {
            case 'PERSPECTIVE':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <TouchableOpacity style={controlStyles.optionButton} onPress={getPerspectiveBB}>
                            <Text>Auto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={controlStyles.optionButton} onPress={()=>alert("Feature coming soon")}>
                            <Text>Manual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={controlStyles.optionButton} onPress={resetPerspectiveBB}>
                            <Text>Off</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={controlStyles.optionButton} onPress={applyPerspectiveWarp}>
                            <Text>Apply</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'B&W':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>B&W (Coming Soon)</Text>
                    </View>
                );
            case 'ROTATE':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>Rotate (Coming Soon)</Text>
                    </View>
                );
            case 'CROP_STRAIGHTEN':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>Crop & Straighten (Coming Soon)</Text>
                    </View>
                );
            default:
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text></Text>
                    </View>
                );
        }
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
                                <Image width={imageWidth} height={imageHeight}
                                       href={controlMode === 'PERSPECTIVE' ? image.uri : manipulatedImage.uri}/>
                                {
                                    (controlMode === 'PERSPECTIVE' && perspectiveBB.length === 8) ?
                                        <PerspectiveBoundingBox bb={perspectiveBB}/>
                                        : null
                                }
                            </Svg>
                        </View>
                    </View>
                    <ImageControlPanel/>
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
            justifyContent: 'flex-end',
        },
        imageContainer: {
            backgroundColor: colors.color3,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            // borderRadius: 10,
        },
    })

const controlStyles = StyleSheet.create(
    {
        controlsContainer: {
            // backgroundColor: '#25f375',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 5,
            height: 120,
        },
        controlsTopContainer: {
            width: vw(100),
            height: 60,
            // backgroundColor: '#E35621',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 5,
        },
        controlsBottomContainer: {
            width: vw(100),
            flex: 1,
            // backgroundColor: '#E3E621',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        controlButton: {
            backgroundColor: colors.color3,
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
        },
        optionButton: {
            backgroundColor: '#c3c3c3',
            width: 70,
            height: 35,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
        },
    })

export default ImageEditScreen;
