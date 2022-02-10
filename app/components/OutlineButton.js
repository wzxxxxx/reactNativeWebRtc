import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {t} from 'react-native-tailwindcss';

export const OutlineButton = (props) => {
    const {text, onPress} = props;
    return (
        <TouchableOpacity onPress={() => onPress()}
                          style={[t.wFull, t.h10, t.bgGreen500, t.rounded, t.flex, t.itemsCenter, t.justifyCenter]}>
            <Text style={[t.textWhite, t.textBase]}>{text} </Text>
        </TouchableOpacity>
    )
}
