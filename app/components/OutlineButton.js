import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const OutlineButton = (props) => {
    return (
        <View style={{
            width: '100%',
            height: 40,
            borderColor: 'black',
            borderRadius: 4,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TouchableOpacity onPress={() => props.connect}>
                <Text style={{
                    color: 'black'
                }}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}
