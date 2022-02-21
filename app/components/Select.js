import styled from "styled-components/native/dist/styled-components.native.esm";
import React from 'react';

export const Select = (props) => {
    return (
        <Container>
            <Label>{props.label}
                {
                    props.required && <Asterisk> *</Asterisk>
                }</Label>
            <PressArea
                onPress={() => props.navigateTo()}><SelectedText>{props.selectedText}</SelectedText><Arrow/></PressArea>
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

const Asterisk = styled.Text`
  color: red;
  align-self: flex-end;
`

const PressArea = styled.TouchableOpacity`
  width: auto;
  flex: 1;
  padding-right: 20px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const SelectedText = styled.Text`
  width: auto;
  color: black;
  font-size: 18px;
`

const Arrow = styled.View`
  width: 12px;
  height: 12px;
  background: white;
  border-top-width: 3px;
  border-right-width: 3px;
  border-color: gainsboro;
  transform: rotate(45deg)
`
