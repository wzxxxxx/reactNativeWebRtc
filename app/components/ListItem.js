import {Text} from "react-native";
import React from "react";
import styled from "styled-components/native"

const ListItem = (props) => {
    const {id, signalServer, stunServer, turnServer} = props;
    const signalServerStr = `${signalServer?.protocol}://${signalServer?.ip}:${signalServer?.port}`;
    const stunServerStr = `stun:${stunServer?.ip}:${stunServer?.port}`;
    const turnServerStr = `turn:${turnServer?.ip}:${turnServer?.port}`;
    return(
        <Container>
            <Text>{id}</Text>
            <Text>Signal Server: {signalServerStr}</Text>
            <Text>Stun Server: {stunServerStr}</Text>
            <Text>Turn Server: {turnServerStr}</Text>
        </Container>
    )
}

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100px;
  padding-left: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #eeeeee;
`

export default ListItem;
