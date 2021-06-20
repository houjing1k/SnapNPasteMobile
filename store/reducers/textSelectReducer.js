import {ADD_ALL, ADD_ITEM, REMOVE_ALL, REMOVE_ITEM} from "../actions/types";

const initialArray = []

const textSelectReducer = (arr = initialArray, action) => {
    let index = arr.indexOf(action.index);
    let tempArr = [...arr];
    switch (action.type) {
        case ADD_ITEM:
            if (!(index > -1)) {
                // console.log('add..')
                tempArr.push(action.index)
                tempArr.sort((a, b) => a - b);
                return tempArr;
            }
        case REMOVE_ITEM:
            if (index > -1) {
                // console.log('remove..')
                tempArr.splice(index, 1);
                tempArr.sort((a, b) => a - b);
                return tempArr;
            }
        case ADD_ALL:
            tempArr = [];
            for (let i = 0; i < action.length; i++) {
                tempArr.push(i);
            }
            return tempArr;
        case REMOVE_ALL:
            return [];
        default:
            return initialArray
    }
}

export default textSelectReducer;