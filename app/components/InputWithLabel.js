import React from "react";
import styled from "styled-components/native"

export const InputWithLabel = (props) => {
    return (
        <Container style={{
            display: "flex",
            flexDirection: "row",
            height: 50,
        }}>
            <Label style={{
                width: 100,
                lineHeight: 50,
                marginLeft: 20,
                fontSize: 18
            }}>{props.label}</Label>
            <Input onChangeText={text => props.get(text)} autoCorrect={false} autoCapitalize={"none"}/>
        </Container>
    )
}

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  border-bottom-width: 1px;
  border-color: #eeeeee;
`
const Label = styled.Text`
  width: 100px;
  margin-left: 20px;
  font-size: 18px;
`
const Input = styled.TextInput`
  height: 50px;
  align-self: center;
  font-size: 18px;
  width: 100%;
  color: black;
`

