import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const OutlineButton = (props) => {
    const {text, onPress} = props;
    return (
        <View style={{
            width: '100%',
            height: 40,
            backgroundColor: 'blue',
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={{
                    color: 'white'
                }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
