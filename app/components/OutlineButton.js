import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const OutlineButton = (props) => {
    const {text, connect} = props;
    return (
        <View style={{
            width: '100%',
            height: 40,
            backgroundColor: 'green',
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TouchableOpacity onPress={() => connect()}>
                <Text style={{
                    color: 'white'
                }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
