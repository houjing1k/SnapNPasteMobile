import React, {useContext, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert,
    flexDirection,
    Image
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {vw} from "react-native-expo-viewport-units";
import {set} from 'react-native-reanimated';
import {useSelector} from "react-redux";
import services from "../services/services";
import {AuthContext} from "../context/context";
import authenticationService from "../services/authenticationService";
import prompt from 'react-native-prompt-android';

function AccountSettingScreen({navigation}) {

    const account = useSelector(state => state.account);
    const {getProfile, updateUsername} = useContext(AuthContext);

    const [username, setUsername] = useState("")

    const handleUsernameChange = (text) => {
        // setUsername({
        //     ...username,
        //     username: text,
        //     isValidEmail: text !== '',
        // });
        updateUsername(text, account.userToken);
    }


    const EditAvatar = () => {
        Alert.alert(
            "Edit Avatar",
            " ",
            [{text: "Upload"},
                {text: "Cancel"}]
        );
    }

    const EditName = () => {
        prompt("Edit Name", "Type in your name below",
            [{
                text: "Confirm", onPress: (text) => {handleUsernameChange(text)}
                
            },
                {text: "Cancel"}], 
                {
                    type: 'plain-text',
                    cancelable: true,
                    defaultValue: '',
                    placeholder: 'Name'
                })

    }

    const ProfileDetails = () => {
        return (
            <View style={styles.profileDetailsContainer}>
                <Image style={styles.avatarContainer} source={account.profilePicture}/>
                <View style={styles.editButtonContainer}>
                    <TouchableOpacity style={styles.buttonSmall} onPress={EditAvatar}>
                        <Text style={styles.smallText}>Edit Avatar</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>{account.email}</Text>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>{'Account Type: ' + account.subscriptionType}</Text>
                </View>

            </View>
        )
    }


    const UsernameDetails = () => {
        return (
            <View style={styles.usernameDetailsContainer}>
                <View style={styles.usernameTitle}>
                    <Text style={commonStyle.commonTextStyleDark}>Name :</Text>
                </View>

                <View style={styles.usernameName}>
                    <Text style={commonStyle.commonTextStyleDark}>{account.username}</Text>
                </View>

                <View style={[styles.editButtonContainer, {maxWidth: 50}]}>
                    <TouchableOpacity style={styles.buttonTiny} onPress={EditName}>
                        <Text style={styles.smallText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    const button1Action = () => {
        handleUsernameChange('TEST');
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

            {/*<View style={styles.bottomContainer}>*/}
            {/*    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button1Action}>*/}
            {/*        <Text style={[commonStyle.commonTextStyleLight]}>Button 1</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button2Action}>*/}
            {/*        <Text style={[commonStyle.commonTextStyleLight]}>Button 2</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}

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

    profileDetailsContainer: {
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
        marginBottom: 10,
    },

    editButtonContainer: {
        width: vw(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'green',
    },

    buttonSmall: {
        backgroundColor: colors.primaryColor,
        width: 80,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonTiny: {
        backgroundColor: colors.primaryColor,
        width: 40,
        height: 22,
        borderRadius: vw(5),
        alignItems: 'center',
        justifyContent: 'center',
    },

    usernameDetailsContainer: {
        width: vw(85),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'yellow'

    },

    usernameTitle: {
        width: vw(25),
        maxWidth: 150,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: colors.primaryColor
    },

    usernameName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: colors.primaryColor
    },

    detailContainer: {
        width: vw(65),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,

    },

    detailText: {
        fontSize: 18,
    },


    smallText: {
        fontSize: 13,
    },


    divider: {
        width: vw(85),
        marginVertical: 5,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },

})

export default AccountSettingScreen;
