import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    flexWrap,
    ScrollView
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from '../common/commonStyles';
import {useEffect, useState} from 'react' ;
import axios from "axios";
import services from "../services/services";
import {useSelector} from "react-redux";
import {vw, vh} from "react-native-expo-viewport-units";

function FeedbackScreen({navigation}) {

    const account = useSelector(state => state.account);

    const [data, setData] = useState({
        Title: '',
        Feedback: '',

    })

    const Submit = async () => {
        if (data.isValidTitle && data.isValidFeedback) {
            await services.postFeedback(data.Title + ': ' + data.Feedback, account.email, account.userToken)
                .then((response) => {
                    console.log(response);
                    Alert.alert(
                        "Submission Successful",
                        "Your feedback has been sent to us. Thank you!",
                        [
                            {
                                text: "OK", onPress: () => {
                                    navigation.pop();
                                }
                            }]
                    );
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert(
                        "Error",
                        "Submission unsuccessful, try again.",
                        [{
                            text: "OK", onPress: () => {
                            }
                        }]
                    );
                });
        } else {
            Alert.alert(
                "Invalid Input",
                (!data.isValidTitle ? 'Please input title!\n' : '') +
                (!data.isValidFeedback ? 'Please input feedback!\n' : ''),
                [{text: "OK"}]
            )
        }
    }

    const handleTitleChange = (val) => {
        setData({
            ...data,
            Title: val,
            isValidTitle: val !== '',
        });
    }

    const handleFeedbackChange = (val) => {
        setData({
            ...data,
            Feedback: val,
            isValidFeedback: val !== '',
        });
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <SafeAreaView>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==="ios"? "padding":"height"}>
                <View style={styles.container}>
                    <StatusBar/>
                    <Header navigation={navigation} text={'Feedback'} backEnabled={true}/>

                    <View style={styles.contentContainer}>
                        <View style={styles.inputSetContainer}>
                            <View style={styles.textStyle}>
                                <Text style={commonStyle.commonTextStyleDark}>Title: </Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={[styles.input, {width: 220}]}
                                    placeholder={"What's the issue?"}
                                    onChangeText={(val) => handleTitleChange(val)}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputSetContainer]}>
                            <View style={[styles.textStyle, {marginTop: 28}]}>
                                <Text style={commonStyle.commonTextStyleDark}>Feedback: </Text>
                            </View>
                            <View style={styles.inputFieldContainerBig} flexDirection='row'>
                                <TextInput
                                    multiline
                                    style={[styles.input, {width: 220}]}
                                    placeholder={"How can we improve/fix it?"}
                                    onChangeText={(val) => handleFeedbackChange(val)}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow]} onPress={Submit}>
                            <Text style={commonStyle.commonTextStyleLight}>Submit Feedback</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'yellow',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        //width: vw(100),
        //height: vh(90),
        //backgroundColor: 'cyan',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        //overflow: 'hidden'

    },
    bottomContainer: {
        height: 90,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        //flex: 1,
    },

    inputContainer: {
        // backgroundColor: 'yellow',
        marginTop: 20,
    },

    inputSetContainer: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },

    inputFieldContainer: {
        // backgroundColor: 'blue',
        // width: 250,
        height: vh(8),
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.color4,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 8,
    },

    inputFieldContainerBig: {
        // backgroundColor: 'green',
        // width: 250,
        height: vh(30),
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 5,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: colors.color4,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 8,
        marginTop: 20,
    },

    input: {
        // backgroundColor: '#FFFFFF',
        // borderWidth: 2,
        width: 185,
        fontSize: 17,
        // marginRight: 5,
    },

    textStyle: {
        // backgroundColor: 'orange',
        width: 85,
        marginTop: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },


})

export default FeedbackScreen;
