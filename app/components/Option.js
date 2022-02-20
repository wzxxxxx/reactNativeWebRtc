import React from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";

export const Option = (props) => {
    return (
        <Container onPress={() => props.backTo()}>
            <Label>{props.label}</Label>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: 50px;
  align-items: center;
`
const Label = styled.Text`
  width: 100px;
  margin-left: 20px;
  font-size: 18px;
`
