import React from "react";
import styled from "styled-components/native"

export const Button = (props) => {
    const {text, onPress} = props;
    return (
        <Container onPress={() => onPress()}>
            <ButtonText>{text}</ButtonText>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: limegreen;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`

