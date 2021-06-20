import React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, Alert, flexDirection} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {vw} from "react-native-expo-viewport-units";

function AccountSettingScreen({navigation}) {

    const EditAvatar = () => {
        Alert.alert(
            "Edit Avatar", 
            " ",
            [{text:"Upload"},
            {text:"Cancel"}]

        );
    }

    const ProfileDetails = () => {
        return (
            <View style={styles.profileDetailsContainer}>
                <View style={styles.avatarContainer}>
                    <MaterialIcon name={'account-circle'} size={vw(35)}/>
                </View>

                <View style={styles.editButtonContainer}> 
                    <TouchableOpacity style={styles.buttonSmall} onPress={EditAvatar}>
                        <Text style={styles.editAvatarText}>Edit Avatar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>xxxxxxxxx.gmail.com</Text>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Account Type: Premium</Text>
                </View>

            </View>
        )
    }

    const button1Action = () => {
        // navigation.navigate('Home')
    }
    const button2Action = () => {
        // navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Account Settings'} backEnabled={true}/>
            <View style={styles.contentContainer}>
                <ProfileDetails/>
                <View style={styles.divider}/>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button1Action}>
                    <Text style={[commonStyle.commonTextStyleLight]}>Button 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button2Action}>
                    <Text style={[commonStyle.commonTextStyleLight]}>Button 2</Text>
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
        justifyContent: 'flex-end'
    },

    profileDetailsContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,

    },
    
    avatarContainer: {
        backgroundColor: colors.primaryColor,
        width: vw(35),
        height: vw(35),
        borderRadius: vw(35 / 2),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    }, 
    
    editButtonContainer:{
        width: vw(65),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    
    buttonSmall: {
        backgroundColor: colors.primaryColor,
        width: vw(20),
        height: vw(10),
        borderRadius: vw(10),
        alignItems: 'center',
        justifyContent: 'center',
    },

    nameContainer:{

    },

    detailContainer:{
        width: vw(65),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
       
    },

    detailText:{
        fontSize: 15,
    },

    editAvatarText:{
        fontSize: 13,
    },

    accountTypeContainer:{

    },

    divider: {
        width: vw(85),
        marginVertical: 10,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },

})

export default AccountSettingScreen;
