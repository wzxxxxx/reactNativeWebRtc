import {Button} from "../components/Button";
import React, {useState} from "react";
import {useEffect} from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {FlatList, StyleSheet, View} from "react-native";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "../components/ListItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components/native";

const Home = ({navigation}) => {

    const [connectionList, setConnectionList] = useState([]);

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {
        try {
            const historyString = await AsyncStorage.getItem('history');
            setConnectionList(historyString ? JSON.parse(historyString) : []);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <SafeAreaView style={{
            backgroundColor: Colors.white,
            ...StyleSheet.absoluteFill
        }}>
            <View style={{padding: 20}}>
                <Button text={'Create New Connection'} onPress={() => navigation.navigate('Create Connection')}/>
                <ConnectionList connectionList={connectionList}/>
            </View>
        </SafeAreaView>)
}

const ConnectionList = (props) => {
    const connectionList = props.connectionList;
    const renderItem = ({item}) => (
        <ListItem id={item.id}/>
    );
    return (<FlatList data={connectionList} renderItem={renderItem}
                      ListEmptyComponent={() => (<EmptyListText>{'No Histories.'}</EmptyListText>)}/>)
}

const EmptyListText = styled.Text`
  text-align: center;
  margin-top: 100px;
`

export default Home;
