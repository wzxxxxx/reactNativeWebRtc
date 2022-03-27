import {List} from "../components/List";
import {ListItemType} from "../components/List";
import React from "react";
import { View } from 'react-native';

const Protocols = {
    http: 'http',
    https: 'https',
    ws: 'ws',
    wss: 'wss'
}

const Protocol = ({navigation}) => {

    const props = [{
        type: ListItemType.option,
        label: 'http',
        navigateTo: () => {navigateTo('Create Connection', Protocols.http)}
    }, {
        type: ListItemType.option,
        label: 'https',
        navigateTo: () => {navigateTo('Create Connection', Protocols.https)}
    }, {
        type: ListItemType.option,
        label: 'ws',
        navigateTo: () => {navigateTo('Create Connection', Protocols.ws)}
    }, {
        type: ListItemType.option,
        label: 'wss',
        navigateTo: () => {navigateTo('Create Connection', Protocols.wss)}
    }]

    const navigateTo = (value, protocol) => {
        navigation.navigate(value, {
            protocol: protocol
        })
    }

    return (
        <>
            <View style={{ marginTop: 20}}/>
            <List props={props}/>
        </>
    );
};

export default Protocol;
