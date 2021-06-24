import React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import { vw, vh } from 'react-native-expo-viewport-units';
import { color } from 'react-native-elements/dist/helpers';

function HistoryScreen({ navigation }) {

    const selectButton = () => {
        //navigation.navigate('TextConfirmation')
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header navigation={navigation} text={'History'} backEnabled={true} />
            <View style={styles.contentContainer}>
                <View style={styles.historyContainer}>
                    <ScrollView contentContainerStyles={styles.historyScrollContainer}>
                        <View style={styles.historyItemContainer}>
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                        </View>

                        <View style={styles.historyItemContainer}>
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                        </View>

                        <View style={styles.historyItemContainer}>
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                            <Image source={{ width: vw(35), height: vh(25), uri: "https://picsum.photos/100/100", }} />
                        </View>


                    </ScrollView>


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

    historyContainer: {
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

    historyScrollContainer: {
        // width: vw(85),
        //height: vh(65 / 2),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //alignContent: 'center',
        //backgroundColor: 'yellow',
        //flexWrap: 'wrap',


    },

    historyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: vh(2),
    }


})

export default HistoryScreen;
