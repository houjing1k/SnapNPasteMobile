import React, { useState } from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, Alert, flexDirection} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {vw} from "react-native-expo-viewport-units";
import { set } from 'react-native-reanimated';

function AccountSettingScreen({navigation}) {

    const [username, setUsername] = useState("")




    const EditAvatar = () => {
        Alert.alert(
            "Edit Avatar", 
            " ",
            [{text:"Upload"},
            {text:"Cancel"}]

        );
    }
    
    const EditName = () => {
        Alert.prompt("Edit Name","Type in your name below",
        [{text:"Confirm", onPress: (text)=> {setUsername(text)}},
        {text: "Cancel"}])
        
    }

    const ProfileDetails = () => {
        return (
            <View style={styles.profileDetailsContainer}>
                <View style={styles.avatarContainer}>
                    <MaterialIcon name={'account-circle'} size={vw(35)}/>
                </View>

                <View style={styles.editButtonContainer}> 
                    <TouchableOpacity style={styles.buttonSmall} onPress={EditAvatar}>
                        <Text style={styles.smallText}>Edit Avatar</Text>
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


    const UsernameDetails = () => {
        return(
            <View style={styles.usernameDetailsContainer}>
                <View style={styles.usernameTitle}>
                    <Text style={commonStyle.commonTextStyleDark}>Name : </Text>
                </View>

                <View style={styles.usernameName}>
                    <Text style={commonStyle.commonTextStyleDark} numberOfLines={1}>{username.username}</Text>
                </View>
                
                <View style={styles.editButtonContainer}>
                    <TouchableOpacity style={styles.buttonTiny} onPress={EditName}>
                        <Text style={styles.smallText}>Edit</Text>
                    </TouchableOpacity> 
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
                <UsernameDetails/> 
                <View style={styles.divider}/>
            </View>

            {/* <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button1Action}>
                    <Text style={[commonStyle.commonTextStyleLight]}>Button 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button2Action}>
                    <Text style={[commonStyle.commonTextStyleLight]}>Button 2</Text>
                </TouchableOpacity>
            </View> */}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },

    contentContainer: {
        flex: 3,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
        
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
        marginVertical: 10,
        

    },
    
    avatarContainer: {
        backgroundColor: colors.primaryColor,
        width: 150,
        height: 150,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    }, 
    
    editButtonContainer:{
        width: vw(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        
    },
    
    buttonSmall: {
        backgroundColor: colors.primaryColor,
        width: vw(20),
        height: vw(10),
        borderRadius: vw(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    buttonTiny: {
        backgroundColor: colors.primaryColor,
        width: vw(10),
        height: vw(5),
        borderRadius: vw(5),
        alignItems: 'center',
        justifyContent: 'center',
    },

    usernameDetailsContainer:{
        width: vw(85),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
       // backgroundColor: 'yellow'

    },

    usernameTitle:{
        width: vw(25),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: colors.primaryColor
    },

    usernameName:{
        width: vw(40),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        
    },

    detailContainer:{
        width: vw(65),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
       
    },

    detailText:{
        fontSize: 18,
    },


    smallText:{
        fontSize: 13,
    },

 
    divider: {
        width: vw(85),
        marginVertical: 10,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },

})

export default AccountSettingScreen;
