import React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, Image} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import { vw, vh } from 'react-native-expo-viewport-units';
import { color } from 'react-native-elements/dist/helpers';

function HistoryScreen({navigation}) {

    const selectButton = () => {
        //navigation.navigate('TextConfirmation')
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'History'} backEnabled={true}/>
            <View style={styles.contentContainer}>
                <View style={styles.historyContainer}>
                    <View styles={styles.historyItemContainer}>
                        <Image source={{width:vw(35), height:vh(25), uri:"https://picsum.photos/200/300",}}/> 
                        <Image source={{width:vw(35), height:vh(25), uri:"https://picsum.photos/200/300",}}/> 
                    </View>
                    <View styles={styles.historyItemContainer}>
                        <Image source={{width:vw(35), height:vh(25), uri:"https://picsum.photos/200/300",}}/> 
                        <Image source={{width:vw(35), height:vh(25), uri:"https://picsum.photos/200/300",}}/> 
                    </View>

                </View>
            </View>
            
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={selectButton}>
                    <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={button2Action}>
                    <Text style={styles.buttonText}>Button 2</Text>
                </TouchableOpacity> */}
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
        flex: 3,
        backgroundColor: colors.backgroundColor,
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

    historyContainer:{
        width: vw(85),
        height: vh(65),
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: colors.primaryColor,
    },

    historyItemContainer:{
        width: vw(85),
        height: vw(65/2),
        justifyContent: 'space-evenly',
        backgroundColor: 'yellow'
        
    },
})

export default HistoryScreen;
