import React from 'react';
import {StyleSheet} from 'react-native';
import colors from "./colors";

const commonStyleValues = {
    buttonLargeFontSize: 18,
}

const commonStyle = StyleSheet.create({
    buttonSingle: {
        backgroundColor: colors.primaryColor,
        width: 300,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDual: {
        backgroundColor: colors.primaryColor,
        width: 300,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    commonTextStyleLight: {
        fontSize: 18,
        color: colors.textColorLight,
    },
    commonTextStyleDark: {
        fontSize: 18,
        color: colors.textColorDark,
    },
    dropShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 2,
        shadowRadius: 20,
        shadowOffset: {width: 1, height: 13},
    }
})

export default commonStyle;
