import {Text, TextInput, View} from "react-native";
import React from "react";
import {t} from 'react-native-tailwindcss';

export const SingleLineInput = (props) => {
    return (
        <View style={[t.flexRow, t.itemsCenter, t.h100, t.borderB, t.borderGray300]}>
            <Text style={[t.w100, t.p4, t.textBase]}>{props.label}</Text>
            <TextInput style={[t.alignCenter, t.textBase, t.textBlack]}
                       onChangeText={text => props.get(text)} autoCorrect={false} autoCapitalize={"none"}/>
        </View>
    )
}
