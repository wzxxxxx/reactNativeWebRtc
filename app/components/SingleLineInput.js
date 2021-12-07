import {Text, TextInput, View} from "react-native";
import React from "react";


export const SingleLineInput = (props) => {
    return (
        <>
            <View style={{
                display: "flex",
                flexDirection: "row",
                height: 50,
                borderBottomWidth: 1,
                borderColor: '#eeeeee'
            }}>
                <Text style={{
                    width: 100,
                    lineHeight: 50,
                    marginLeft: 20,
                    fontSize: 18
                }}>{props.label}
                </Text>
                <TextInput style={{
                    width: 300,
                    height: 50,
                    alignSelf: 'center',
                    fontSize: 18,
                    color: 'black'
                }} onChangeText={text => props.get(text)}/>
            </View>
        </>
    )
}
