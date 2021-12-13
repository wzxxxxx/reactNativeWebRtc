import {Text, View} from "react-native";
import React from "react";

const ListItem = (props) => {
    const {id} = props;
    return(
        <View style={{
            display: "flex",
            flexDirection: "row",
            width: '100%',
            height: 50,
            paddingLeft: 20,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eeeeee'
        }}>
            <Text>{id}</Text>
        </View>
    )
}

export default ListItem;
