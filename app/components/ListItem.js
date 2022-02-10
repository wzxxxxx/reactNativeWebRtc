import {Text, View} from "react-native";
import React from "react";
import {t} from 'react-native-tailwindcss';

const ListItem = (props) => {
    const {id} = props;
    return(
        <View style={[t.flex, t.flexRow, t.h50, t.pL20, t.alignCenter, t.borderGray500]}>
            <Text>{id}</Text>
        </View>
    )
}
// {
//     display: "flex",
//         flexDirection: "row",
//     width: '100%',
//     height: 50,
//     paddingLeft: 20,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: '#eeeeee'
// }

export default ListItem;
