import {List} from "../components/List";
import {ListItemType} from "./CreateConnection";
import React from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";

const Protocols = {
    http: 'http',
    https: 'https'
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
    }]

    const navigateTo = (value, protocol) => {
        navigation.navigate(value, {
            protocol: protocol
        })
    }

    return (
        <>
            <Spacer/>
            <List props={props}/>
        </>
    );
};

const Spacer = styled.View`
  margin-top: 20px;
`

export default Protocol;
