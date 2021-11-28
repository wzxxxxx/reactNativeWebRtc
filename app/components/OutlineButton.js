import {Text, View} from "react-native";
import React from "react";

export const OutlineButton = (props) => {
    return (
        <View style={{
            width: '100%',
            height: 40,
            borderColor: 'blue',
            borderRadius: 4,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={{
                color: 'blue'
            }}>{props.text}</Text>
        </View>
    )
}