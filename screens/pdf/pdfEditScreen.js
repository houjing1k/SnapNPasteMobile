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

const imageFrameDimension = () => {
    let maxWidth = Dimensions.get('window').width;
    let maxHeight = Dimensions.get('window').height - 70 - 100 - 120;
    // console.log(maxWidth + " " + maxHeight)
    return {maxWidth, maxHeight};
}

function PdfEditScreen({route, navigation}) {
    const {image} = route.params;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [manipulatedImage, setManipulatedImage] = useState(image.uri);
    const [perspectiveBB, setPerspectiveBB] = useState([]);
    const [controlMode, setControlMode] = useState(null);
    const [perspectiveMode,setPerspectiveMode]=useState('AUTO');
    const [controlState, setControlState]=useState({
        perspective: false,
        rotate: 0,
    })

    const account = useSelector(state => state.account);

    const imageWidth = image.width;
    const imageHeight = image.height;

    useEffect(() => {
    }, [])

    const previewButtonAction = () => {
        navigation.push('PdfConfirmation', {image: manipulatedImage, fromHistory: false});
    }

    const getPerspectiveBB = async () => {
        try {
            const bb = await services.documentDetect(image.uri, account.userToken);
            // console.log(bb);
            // console.log(bb.bb);
            setPerspectiveBB(bb.bb);
        } catch (e) {
            console.log('Failed')
        }
    }
    const applyPerspectiveWarp = async () => {
        try {
            console.log(perspectiveBB);
            if (perspectiveBB.length === 8) {
                const warpedImage = await services.warpImage(image.uri, perspectiveBB, account.userToken);
                // let image = new Image();
                // image.src = 'data:image/png;base64,iVBORw0K...';
                // document.body.appendChild(image);
                setManipulatedImage(`data:image/jpg;base64,${warpedImage.image}`)
            }
            // console.log(warpedImage);
            // console.log(bb.bb);
            // setPerspectiveBB(bb.bb);
        } catch (e) {
            console.log('Failed')
        }
        setControlMode(null);
    }

    useEffect(()=>{

    },[perspectiveMode])


    const Loading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.iconDark}/>
                <Text style={[commonStyle.commonTextStyleDark, {marginTop: 15}]}>Loading</Text>
            </View>
        );
    }

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
                        <TouchableOpacity style={controlStyles.optionButton}>
                            <Text>Manual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={controlStyles.optionButton}>
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
                        <Text>B&W</Text>
                    </View>
                );
            case 'ROTATE':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>Rotate</Text>
                    </View>
                );
            case 'CROP_STRAIGHTEN':
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>Crop & Straighten</Text>
                    </View>
                );
            default:
                return (
                    <View style={controlStyles.controlsBottomContainer}>
                        <Text>Nothing Selected</Text>
                    </View>
                );
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Edit PDF'} backEnabled={true} cancelEnabled={true}/>
            {isLoading ? <Loading/> :
                <View style={styles.container}>
                    <View style={[styles.contentContainer]}>
                        <View style={styles.imageContainer}>
                            <Svg height={imageFrameDimension().maxHeight} width={imageFrameDimension().maxWidth}
                                 viewBox={"0 0 " + imageWidth + " " + imageHeight}>
                                <Image width={imageWidth} height={imageHeight}
                                       href={controlMode === 'PERSPECTIVE' ? image.uri : manipulatedImage}/>
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

export default PdfEditScreen;
