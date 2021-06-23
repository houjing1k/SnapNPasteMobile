import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {INITIALISE, SELECT_DEVICE, UPDATE_DEVICE_LIST} from "./types";
import chatReducer from "../reducers/chatReducer";
import {AsyncStorage} from "react-native";
import uuid from 'react-native-uuid';
import {BYTEUS_URL} from "../../common/config";

const wsURL = BYTEUS_URL + '/ws';
const io = require('socket.io-client')

let socket;

// socket.on('connect', () => {
//     console.log(`connect ${socket.id}`);
//
// });

export const initialiseChat = async (dispatch, account) => {

    // Initialise Device UUID
    let UUID = await AsyncStorage.getItem('UUID');
    if (UUID === null) {
        console.log('UUID not found. Generating new UUID...')
        UUID = uuid.v4();
        await AsyncStorage.setItem('UUID', UUID.toString());
    } else {
        console.log('UUID fetch success');
    }
    console.log('UUID: ' + UUID);

    // Initialise Last Selected Target Device
    const lastDevice = await AsyncStorage.getItem('lastSelectedDevice')
    console.log('last device: ' + lastDevice);
    dispatch({type: SELECT_DEVICE, selectedDevice: lastDevice})

    // Initialise Socket IO
    // console.log('CHAT INITIALISE')
    // console.log(account)
    const user = account.email;
    const deviceName = UUID;

    socket = io(wsURL, {
        path: "/ws/socket.io",
        transports: ["websocket"],
        extraHeaders: {
            "USERNAME": user,
            "DEVICENAME": deviceName,
            "ISPHONE": "true"
        }
    },);

    dispatch({type: INITIALISE, user: user, device: deviceName})

    // Get Online Devices
    socket.on('online_devices', (devices) => {
        // console.log(devices);
        dispatch({type: UPDATE_DEVICE_LIST, deviceList: devices})
    });
};

export const selectDevice = async (dispatch, deviceName) => {
    dispatch({type: SELECT_DEVICE, selectedDevice: deviceName})
    await AsyncStorage.setItem('lastSelectedDevice', deviceName);
}

export const sendText = async (message, chat) => {
    console.log("------SEND TEXT---------")
    if (chat.selectedDevice == null) {
        console.log('No Device Selected!');
    } else {
        console.log(chat);
        console.log('recipient: ' + chat.selectedDevice);
        console.log('message: ' + message);
        await socket.emit("transfer", chat.selectedDevice, message, "text");
    }
};
