import React from "react";
import styled from "styled-components/native"

export const InputWithLabel = (props) => {
    return (
        <Container>
            <Label>{props.label}
                {
                    props.required && <Asterisk> *</Asterisk>
                }</Label>
            <Input onChangeText={text => props.get(text)} autoCorrect={false} autoCapitalize={"none"}/>
        </Container>
    )
}

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`
const Label = styled.Text`
  width: 100px;
  margin-left: 20px;
  font-size: 18px;
`
const Input = styled.TextInput`
  height: 50px;
  font-size: 18px;
  width: 100%;
  color: black;
`
const Asterisk = styled.Text`
  color: red;
  align-self: flex-end;
`



