import {FlatList} from "react-native";
import styled from "styled-components/native";
import {InputWithLabel} from "./InputWithLabel";
import React from 'react';
import {Select} from "./Select";
import {ListItemType} from "../pages/CreateConnection";
import {Option} from "./Option";

export const List = (props) => {
    const renderItem = ({item}) => {
        switch (item.type) {
            case ListItemType.input:
                return (<InputWithLabel label={item.label} required={item.required} get={(value) => item.get(value)}/>);
            case ListItemType.select:
                return (<Select label={item.label} required={item.required} navigateTo={() => item.navigateTo()}
                                selectedText={item.selectedText}/>);
            case ListItemType.option:
                return (<Option label={item.label} navigateTo={() => item.navigateTo()}/>);
            default:
                break;
        }
    };

    return (
        <Container>
            <FlatList data={props.props} renderItem={renderItem} ItemSeparatorComponent={() => (<Separator/>)}>
            </FlatList>
        </Container>
    )
}

const Container = styled.View`
  width: 100%;
  background: white;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: gainsboro;
`

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background: gainsboro;
`

