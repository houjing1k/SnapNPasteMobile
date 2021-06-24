import React, {useContext, useEffect, useState} from "react";
import {Circle, G, Polygon} from "react-native-svg";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../store/actions/textSelectActions";

function PerspectiveBoundingBox(props) {
    // console.log(props.bb)
    let bb = props.bb;
    const points =
        bb[0] + ',' + bb[1] + ' ' +
        bb[2] + ',' + bb[3] + ' ' +
        bb[4] + ',' + bb[5] + ' ' +
        bb[6] + ',' + bb[7];

    const Corner = ({cx,cy})=>{
        return <Circle cx={cx} cy={cy} r="40" stroke="black" stroke-width="3" fill="red" />
    }

    return (
        <G>
            <Polygon
                points={points}
                fill="none"
                stroke={"lime"}
                strokeWidth="3"
            />
            <Corner cx={bb[0]} cy={bb[1]}/>
            <Corner cx={bb[2]} cy={bb[3]}/>
            <Corner cx={bb[4]} cy={bb[5]}/>
            <Corner cx={bb[6]} cy={bb[7]}/>
        </G>
    )
}

export default PerspectiveBoundingBox;