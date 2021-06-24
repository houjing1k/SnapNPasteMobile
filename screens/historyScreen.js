import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView, Alert
} from 'react-native';
import Header from "../components/header";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import {vw, vh} from 'react-native-expo-viewport-units';
import {color} from 'react-native-elements/dist/helpers';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Svg from "react-native-svg";
import {clearHistory, getHistory} from "../store/actions/chatActions";
import Loading from "../components/Loading";

function HistoryScreen({navigation}) {


    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [historyItemList, setHistoryItemList] = useState([]);

    useEffect(() => {
        (async () => {
            const itemList = await getHistory();
            setHistoryItemList(itemList);
            setIsLoading(false);
        })()
    }, [])

    const clearHistoryAction = () => {
        Alert.alert("Are you sure?", "Clearing of history is permanent and irreversible",
            [{
                text: "Confirm", onPress: (text) => {
                    clearHistory();
                    setHistoryItemList([]);
                }
            },
                {text: "Cancel"}]);
    }

    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])


    const HistoryItemGrid = ({itemList}) => {
        itemList=itemList.reverse();
        let list = [];
        let isEven = itemList.length % 2 === 0;
        let listRowSize = isEven ? itemList.length : itemList.length + 1;
        // console.log('list row size: ' + listRowSize);
        const HistoryItem = ({item}) => {
            switch (item.type) {
                case 'TEXT':
                    return (
                        <View
                            style={[historyItemStyles.historyItemContainer, {borderColor: selectedItem === item ? colors.color4 : colors.color3}]}>
                            <TouchableOpacity
                                style={[historyItemStyles.historyItemButton]}
                                onPress={() => navigation.push('TextConfirmation', {
                                    text: item.content,
                                    fromHistory: true
                                })}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text style={historyItemStyles.historyText}>{item.content}</Text>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                    )
                case 'IMAGE':
                    return (
                        <View
                            style={[historyItemStyles.historyItemContainer, {borderColor: selectedItem === item ? colors.color4 : colors.color3}]}>
                            <TouchableOpacity
                                style={[historyItemStyles.historyItemButton]}
                                onPress={() => navigation.push('ImageConfirmation', {
                                    image: JSON.parse(item.content),
                                    fromHistory: true
                                })}>
                                <View>
                                    <Image source={JSON.parse(item.content)} style={historyItemStyles.historyImage}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                default:
                    return null;
            }
        }

        for (let i = 0; i < listRowSize; i += 2) {
            // console.log('item: ' + i);
            let firstItem = itemList[i];
            let secondItem = (i < listRowSize) ? itemList[i + 1] : itemList[i];
            list.push(
                <View key={i} style={{flexDirection: 'row'}}>
                    <HistoryItem item={firstItem}/>
                    {
                        (i === listRowSize - 2 && !isEven) ?
                            <View/> :
                            <HistoryItem item={secondItem}/>
                    }
                </View>
            )
        }
        return (<View>{list}</View>)
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Header navigation={navigation} text={'History'} backEnabled={true}/>
            {
                isLoading ? <Loading text={'Loading'}/> :
                    <View style={styles.contentContainer}>
                        <ScrollView contentContainerStyles={styles.historyScrollContainer}
                                    showsVerticalScrollIndicator={false}>
                            <HistoryItemGrid itemList={historyItemList}/>
                        </ScrollView>
                    </View>
            }
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[commonStyle.buttonSingle, commonStyle.dropShadow, {backgroundColor: '#EF9595'}]}
                    onPress={clearHistoryAction} disabled={false}>
                    <Text style={commonStyle.commonTextStyleLight}>Clear History</Text>
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
        flex: 1,
        // backgroundColor: colors.backgroundColor,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        height: 100,
        // backgroundColor: '#183fc8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },

    historyContainer: {
        width: vw(100),
        flex: 1,
        paddingLeft: 15,
        paddingRight: 10,
        // marginVertical: 20,
        // borderWidth: 2,
        // borderColor: colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: colors.primaryColor,
    },

    historyScrollContainer: {
        // width: vw(85),
        // height: vh(65 / 2),
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        //alignContent: 'center',
        // flex: 1,
        // backgroundColor: 'green',
        //flexWrap: 'wrap',


    },

    historyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: vh(2),
    }


})

const historyItemStyles = StyleSheet.create({
    historyItemContainer: {
        // backgroundColor: 'green',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        borderWidth: 4,
        overflow: 'hidden',
    },
    historyItemButton: {
        backgroundColor: colors.color3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: vw(40),
        height: vw(50),
        padding: 10,
        overflow: 'hidden',
    },
    historyText: {
        fontSize: 18,
        textAlign: 'center',
    },
    historyImage: {
        width: vw(40),
        height: vw(50),
        resizeMode: 'contain',
    }
});

export default HistoryScreen;
