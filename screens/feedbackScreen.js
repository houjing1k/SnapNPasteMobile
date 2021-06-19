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
        flexWrap
        } from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from '../common/commonStyles';

function FeedbackScreen({navigation}) {

    const button1Action = () => {
        Alert.alert(title= "Feedback Submission", message= "Successful")
        // navigation.navigate('Home')
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }

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
                            />
                        </View>
                    </View>
                

                   
                    <View style={styles.inputSetContainer}>
                        <View style={styles.textStyle}>
                            <Text style={commonStyle.commonTextStyleDark} >Feedback : </Text> 
                        </View>
                        <View style={styles.inputFieldContainerBig} flexDirection= 'row'>
                            <TextInput
                                style={[styles.input, {width: 220}]}
                                placeholder={"How can we improve/fix it?"}
                               
                                
                                    
                            />
                        </View>
                    </View>
                    
                </View> 
                
                {/* <View style={styles.contentContainer}>
                </View>  */}

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button1Action}>
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
