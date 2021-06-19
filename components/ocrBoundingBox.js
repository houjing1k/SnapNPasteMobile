import React, {useContext, useEffect, useState} from "react";
import {Polygon} from "react-native-svg";
import {SelectionContext, SelectionProvider} from "../context/context";

function BoundingBox(props) {
    // console.log(props.bb)
    const bb = props.bb;
    const points =
        bb[0] + ',' + bb[1] + ' ' +
        bb[2] + ',' + bb[3] + ' ' +
        bb[4] + ',' + bb[5] + ' ' +
        bb[6] + ',' + bb[7];
    // console.log('index: ' + props.index);
    // console.log('points: ' + points);

    const [selectedText, setSelectedText] = useContext(SelectionContext);

    const [isSelected, setIsSelected] = useState(false);
    const toggle = () => {
        setIsSelected(!isSelected)
    };

    useEffect(() => {
        if (isSelected) {
            selectedText.push(props.index);
        } else {
            selectedText.splice(selectedText.indexOf(props.index), 1);
        }
        // console.log(selectedText);
    }, [isSelected])

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