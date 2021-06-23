import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import Header from "../../components/header";
import colors from "../../common/colors";
import commonStyle from "../../common/commonStyles";
import {vw} from "react-native-expo-viewport-units";
import {useSelector} from "react-redux";
import {sendText} from "../../store/actions/chatActions";

function TextConfirmationScreen({route, navigation}) {

    const {text} = route.params;
    const chat = useSelector(state => state.chat);

    const pasteButtonAction = () => {
        sendText(text, chat);
        Alert.alert(
            "Paste to PC",
            "Successfully Pasted to PC",
            [
                {
                    text: "OK", onPress: () => {
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Preview Text'} backEnabled={true} cancelEnabled={true}/>
            <View style={styles.contentContainer}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>{text}</Text>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow]}
                                  onPress={pasteButtonAction}>
                    <Text style={[commonStyle.commonTextStyleLight]}>Paste to PC</Text>
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
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        // width: vw(100),
        padding: 20,
        borderWidth: 2,
        borderColor: colors.iconDark,
        borderRadius: 20,
    },
    bottomContainer: {
        // flex: 1,
        // backgroundColor: '#183fc8',
        height: 120,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {},
    text: {
        fontSize: 20,
    }

})

export default TextConfirmationScreen;
