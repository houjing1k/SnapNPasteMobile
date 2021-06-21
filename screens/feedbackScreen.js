import React from 'react';
import {View, 
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
        } from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from '../common/commonStyles';
import { useEffect, useState } from 'react' ;

function FeedbackScreen({navigation}) {

    const [data, setData] = useState({
        Title: '',
        Feedback: '',
        
    })

    const Submit = async () => {
        if (data.isValidTitle && data.isValidFeedback) {
            await axios.post('http://byteus.me:8000/All_feedback', {
                title: data.Title,
                feedback: data.Feedback,
            })
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
                (!data.isValidFeedback ? 'Please input feedback!\n' : '') +
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
        <KeyboardAvoidingView style={styles.container}>

            <View style={styles.container}>
                <StatusBar/>
                <Header navigation={navigation} text={'Feedback'} backEnabled={true}/>

                <View style={styles.contentContainer}>
                
                    <View style={styles.inputSetContainer}>
                        <View style={styles.textStyle}>
                            <Text style={commonStyle.commonTextStyleDark}  >Title : </Text> 
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={[styles.input, {width: 220}]}
                                placeholder={"What's the issue?"}
                                onChangeText={(val) => handleTitleChange(val)}
                            />
                        </View>
                    </View>
                

                   
                    <View style={styles.inputSetContainer}>
                        <View style={styles.textStyle}>
                            <Text style={commonStyle.commonTextStyleDark} >Feedback : </Text> 
                        </View>
                        <View style={styles.inputFieldContainerBig} flexDirection= 'row'>
                            <TextInput
                                multiline
                                style={[styles.input, {width: 220}]}
                                placeholder={"How can we improve/fix it?"}
                                onChangeText={(val) => handleFeedbackChange(val)}
                                
                                    
                            />
                        </View>
                    </View>
                    
                </View> 
                
                {/* <View style={styles.contentContainer}>
                </View>  */}

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={Submit}>
                        <Text style={commonStyle.commonTextStyleLight}>Submit Feedback</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={button2Action}>
                        <Text style={styles.buttonText}>Button 2</Text>
                    </TouchableOpacity> */}
                </View>

            </View>
        </KeyboardAvoidingView>
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
        flex: 3,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        // backgroundColor: 'green',
        width: 250,
        height: 50,
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },

    inputFieldContainerBig: {
        // backgroundColor: 'green',
        width: 250,
        height: 250,
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
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

    textStyle:{
        width: 100,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        
    }, 
   

})

export default FeedbackScreen;
