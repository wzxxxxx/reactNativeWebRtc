import {Text} from "react-native";
import React from "react";
import styled from "styled-components/native"

const ListItem = (props) => {
    const {id} = props;
    return(
        <Container>
            <Text>{id}</Text>
        </Container>
    )
}

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #eeeeee;
`

export default ListItem;
