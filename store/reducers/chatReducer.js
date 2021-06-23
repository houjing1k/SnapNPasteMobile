import {INITIALISE, SELECT_DEVICE, SEND_TEXT, UPDATE_DEVICE_LIST} from "../actions/types";


const initialState = {
    activeUser: null,
    activeDevice: null,
    isInitialised: false,
    deviceList: [],
    selectedDevice: null,
    isSelectedDeviceOnline: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISE:
            console.log(action.user);
            console.log(action.device);
            return {
                ...state,
                activeUser: action.user,
                activeDevice: action.device,
                isInitialised: true,
            }
        case UPDATE_DEVICE_LIST:
            console.log('-----------UPDATE DEVICE LIST----------')
            console.log(action.deviceList);
            console.log('selected device:')
            console.log(state.selectedDevice);
            // console.log(action.deviceList.indexOf(state.selectedDevice));
            return {
                ...state,
                deviceList: action.deviceList,
                isSelectedDeviceOnline: (action.deviceList.indexOf(state.selectedDevice) !== -1),
            }
        case SELECT_DEVICE:
            console.log('Select device: ' + action.selectedDevice);
            if (state.deviceList.indexOf(action.selectedDevice) === -1) {
                console.log('Device not online')
            }
            return {
                ...state,
                selectedDevice: action.selectedDevice,
                isSelectedDeviceOnline: (state.deviceList.indexOf(action.selectedDevice) !== -1),
            }
        default:
            return state;
    }
}

export default chatReducer;