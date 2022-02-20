import {List} from "../components/List";
import {ListItemType} from "./CreateConnection";
import React from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";

const Protocol = ({navigation}) => {

    const props = [{
        type: ListItemType.option,
        label: 'http'
    }, {
        type: ListItemType.option,
        label: 'https'
    }]

    const goBack = () => {
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
