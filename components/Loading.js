import {ActivityIndicator, Text, View} from "react-native";
import colors from "../common/colors";
import commonStyle from "../common/commonStyles";
import React from "react";

const Loading = ({text}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.iconDark}/>
            <Text style={[commonStyle.commonTextStyleDark, {marginTop: 15}]}>{text}</Text>
        </View>
    );
}

export default Loading