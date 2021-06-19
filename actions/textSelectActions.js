export const addItem = (index) => {
    return {
        type: 'ADD_ITEM',
        index: index,
    }
}

export const removeItem = (index) => {
    return {
        type: 'REMOVE_ITEM',
        index: index,
    }
}

export const addAll = (length) => {
    return {
        type: 'ADD_ALL',
        length: length,
    }
}

export const removeAll = () => {
    return {
        type: 'REMOVE_ALL',
    }
}