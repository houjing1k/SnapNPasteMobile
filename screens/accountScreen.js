import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {vw} from "react-native-expo-viewport-units";
import commonStyle from "../common/commonStyles";
import {AuthContext} from "../context/context";
import {useSelector} from "react-redux";

function AccountScreen({navigation}) {

    const {signOut} = useContext(AuthContext);
    const account = useSelector(state => state.account);

    const logout = () => {
        signOut();
        // navigation.navigate('Login');
    }

    const ProfileDetails = () => {
        return (
            <View style={styles.profileDetailsContainer}>
                <View style={styles.avatarContainer}>
                    <MaterialIcon name={'account-circle'} size={vw(25)}/>
                    {/*<Text>Icon</Text>*/}
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.nameText}>Name</Text>
                    <Text style={styles.emailText}>{account.userName}</Text>
                </View>
            </View>
        )
    }

    const AccountItem = ({iconName, text, onClickAction}) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={onClickAction}>
                <View style={styles.itemIconContainer}>
                    <MaterialIcon name={iconName} size={30} color={colors.iconDark}/>
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'My Account'} backEnabled={true}/>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ProfileDetails/>
                <View style={styles.divider}/>
                <AccountItem text={'Account Settings'} iconName={'settings'}
                             onClickAction={() => navigation.push('AccountSetting')}/>
                <View style={styles.divider}/>
                <AccountItem text={'Upgrade to Premium (Coming Soon)'} iconName={'stars'}/>
                <View style={styles.divider}/>
                <AccountItem text={'Feedback'} iconName={'chat'} onClickAction={() => navigation.push('Feedback')}/>
                <View style={styles.divider}/>
                <AccountItem text={'Rate Us'} iconName={'thumb-up'}/>
                <View style={styles.divider}/>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[commonStyle.buttonSingle, commonStyle.dropShadow, {marginBottom: 20}]}
                                  onPress={logout}>
                    <Text style={commonStyle.commonTextStyleLight}>Log Out</Text>
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
        // flex: 1,
        // backgroundColor: '#D0D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    bottomContainer: {
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    profileDetailsContainer: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    avatarContainer: {
        backgroundColor: colors.primaryColor,
        width: vw(25),
        height: vw(25),
        borderRadius: vw(25 / 2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailContainer: {
        // backgroundColor: '#DD4252',
        width: vw(65),
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingLeft: 15,
    },
    nameText: {
        fontSize: 22,
    },
    emailText: {
        fontSize: 15,
    },
    divider: {
        width: vw(85),
        marginVertical: 10,
        borderBottomColor: '#656565',
        borderBottomWidth: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    itemIconContainer: {
        // backgroundColor: colors.primaryColor,

    },
    itemTextContainer: {
        // backgroundColor: colors.secondaryColor,
        width: vw(70),
        marginHorizontal: 10,
        paddingLeft: vw(14),
        // alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    },

})

export default AccountScreen;
