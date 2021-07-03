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
    Image,
    Modal,
    TextInput
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {vh, vw} from "react-native-expo-viewport-units";
import {set} from 'react-native-reanimated';
import {useSelector} from "react-redux";
import services from "../services/services";
import {AuthContext} from "../context/context";
import authenticationService from "../services/authenticationService";
import DialogInput from "react-native-dialog-input";
import { color } from 'react-native-elements/dist/helpers';

function AccountSettingScreen({navigation}) {

    const account = useSelector(state => state.account);

    const {getProfile, updateUsername} = useContext(AuthContext);

    const [newUsername, setNewUsername] = useState("")

    const [visible, setVisible] = useState(false);

    const [text, onTextChange] = useState('');


    const submitUsernameChange = () => {
        console.log(newUsername)
        updateUsername(newUsername, account.userToken);

    }


    const ModalInput = ({ onTextChange, onSubmit, visible, value, toggle}) => {
        return(
            //<View style={styles.centeredView}>
                    <Modal animationType='fade' visible={visible} transparent={true} style={styles.modalContainer}>
                        <View style={styles.promptContainer}>
                            <Text style={styles.textStyle2}>Edit Username</Text>
                            <View style={styles.divider2}/>
                            <Text style={styles.textStyle1}>Enter your name below:</Text>
                            <TextInput
                                value={value}
                                onChangeText= {onTextChange}
                                placeholder={'Name'}
                            />

                            <View style={styles.promptButtonContainer}>
                                <Button title="Confirm" onPress={onSubmit}/>
                                <Button title="Cancel" onPress={toggle}/>
                            </View>

                        </View>

                    </Modal>
            //</View>

        );
    };

    const EditAvatar = () => {
        // Alert.alert(
        //     "Edit Avatar",
        //     " ",
        //     [{text: "Upload"},
        //         {text: "Cancel"}]
        // );
        alert('Feature coming soon!')
    }

    const EditName = () => {

        setVisible(true);
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
                    <TouchableOpacity style={styles.buttonTiny} onPress={()=> setVisible(!visible)}>
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
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'Account Settings'} backEnabled={true}/>

            <View style={styles.contentContainer}>
                <ProfileDetails/>
                <View style={styles.divider}/>
                <UsernameDetails/>
                <View style={styles.divider}/>
                <Modal animationType='fade' visible={visible} transparent={true} style={styles.modalContainer}>
                        <View style={styles.promptContainer}>
                            <Text style={styles.textStyle2}>Edit Username</Text>
                            <View style={styles.divider2}/>
                            <Text style={styles.textStyle1}>Enter your name below:</Text>
                            <TextInput

                                onChangeText= {(text)=>setNewUsername(text)}
                                placeholder={'Enter Name'}
                            />

                            <View style={styles.promptButtonContainer}>

                                <View style={styles.individualButton}>
                                    <TouchableOpacity onPress={ ()=>
                                        {setVisible(false);
                                        submitUsernameChange();}}>
                                        <Text style={commonStyle.commonTextStyleDark}>Confirm</Text>

                                    </TouchableOpacity>
                                </View>

                                <View style={styles.individualButton}>
                                    <TouchableOpacity onPress={()=>setVisible(false)}>
                                        <Text style={commonStyle.commonTextStyleDark}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>




                            </View>

                        </View>

                    </Modal>
            </View>

            {/*<View style={styles.bottomContainer}>*/}
            {/*    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button1Action}>*/}
            {/*        <Text style={[commonStyle.commonTextStyleLight]}>Button 1</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={[commonStyle.buttonDual, commonStyle.dropShadow]} onPress={button2Action}>*/}
            {/*        <Text style={[commonStyle.commonTextStyleLight]}>Button 2</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}

        </SafeAreaView>
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

    divider2: {
        width: vw(75),
        marginVertical: 5,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },

    promptContainer:{
        width: vw(85),
        height: vh(25),
        marginTop: vh(45),
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: colors.primaryColor
    },

    promptButtonContainer:{
        flexDirection:'row',
        alignSelf:'center',
       // alignItems: 'flex-end',
        marginVertical: 10,
        //borderRadius: 20,
        //backgroundColor: 'skyblue'
    },

    centeredView:{
        //width: vw(85),
        //height: vh(40),
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 22,
        //backgroundColor: 'yellow'
    },

    textStyle1:{
        fontSize: 13,
        marginVertical: 10,
    },

    textStyle2:{
        flexDirection:'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        marginVertical: 3,
       // backgroundColor: 'yellow'
    },

    modalContainer:{
        width: vw(100),
        height: vh(100),
        marginTop: vh(50),
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },

    individualButton:{
        width: vw(20),
        height: vh(5),
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'skyblue'
    }

})

export default AccountSettingScreen;
