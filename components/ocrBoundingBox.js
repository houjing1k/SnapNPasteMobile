import React, {useContext, useEffect, useState} from "react";
import {Polygon} from "react-native-svg";
import {SelectionContext, SelectionProvider} from "../context/context";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../actions/textSelectActions";

function BoundingBox(props) {
    // console.log(props.bb)
    const bb = props.bb;
    const index = props.index;
    const points =
        bb[0] + ',' + bb[1] + ' ' +
        bb[2] + ',' + bb[3] + ' ' +
        bb[4] + ',' + bb[5] + ' ' +
        bb[6] + ',' + bb[7];
    // console.log('index: ' + props.index);
    // console.log('points: ' + points);

    // const [selectedText, setSelectedText] = useContext(SelectionContext);

    const [isSelected, setIsSelected] = useState(false);

    const list = useSelector(state => state.textSelect)
    // console.log('LIST')
    // console.log(list)
    const dispatch = useDispatch();

    const toggle = () => {
        // let selection = [...list];
        if (isSelected === false) {
            // setSelectedText(selection.push(props.index));
            // selectedText.push(props.index)
            dispatch(addItem(index));
            // console.log('add');
        } else {
            // setSelectedText(selection.splice(selection.indexOf(props.index), 1));
            // selectedText.splice(selectedText.indexOf(props.index), 1)
            dispatch(removeItem(index))
            // console.log('remove');
        }
        console.log(list);
        // setIsSelected(!isSelected)
    };

    useEffect(() => {
        // let selection = [...list];
        // let test = selection.indexOf(index) === -1;
        // console.log(test);
        let isInArray = list.indexOf(props.index)!==-1;
        // let isInArray = false;
        // console.log('array:');
        // console.log(list);
        // console.log('isInArray');
        // console.log(isInArray);
        // console.log('index');
        // console.log(index);
        if (isInArray === true) {
            setIsSelected(true);
        } else setIsSelected(false);
    }, [list])

    return (
        <Polygon
            points={points}
            fill="none"
            stroke={isSelected ? "lime" : "red"}
            strokeWidth="3"
            onPress={toggle}
        />
    )
}

export default BoundingBox;