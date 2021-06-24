import React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import { vw } from 'react-native-expo-viewport-units';

function ConnectionsScreen({ navigation }) {

    const button1Action = () => {
        // navigation.navigate('Home')
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }



    return (
        <View style={styles.container}>
            <StatusBar />
            <Header navigation={navigation} text={'My Connections'} backEnabled={true} />
            <View style={styles.contentContainer}>

                <View style={styles.titleContainer}>
                    <Text style={commonStyle.commonTextStyleDark}>Pasting To: </Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity style={styles.connectionContainer}>
                        <Text>Kenny's laptop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.connectionContainer}>
                        <Text>Han Ming's laptop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.connectionContainer}>
                        <Text>Hou Jing's laptop</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.connectionContainer}>
                        <Text>XX's laptop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.connectionContainer}>
                        <Text>YY's laptop</Text>
                    </TouchableOpacity>

                </ScrollView>


                {/* </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={button1Action}>
                    <Text style={styles.buttonText}>Button 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={button2Action}>
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
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    bottomContainer: {
        flex: 1,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    titleContainer: {
        width: vw(65),
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },

    connectionContainer: {
        // backgroundColor: 'green',
        width: 250,
        height: 60,
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
})

export default ConnectionsScreen;
