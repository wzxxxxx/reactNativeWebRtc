import {OutlineButton} from "./OutlineButton";
import React from "react";
import {useEffect} from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {FlatList, StatusBar, StyleSheet, Text, View} from "react-native";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ListItem from "./ListItem";

const Home = ({navigation}) => {

    // const connectionList = [{
    //     id: "1"
    // }, {
    //     id: "2"
    // }];

    const connectionList = [];

    return (
        <SafeAreaView style={{
            backgroundColor: Colors.white,
            ...StyleSheet.absoluteFill
        }}>
            <View style={{
                padding: 20
            }}>
                <OutlineButton text={'Create New Connection'} onPress={() => navigation.navigate('Create Connection')}/>
            </View>
            <ConnectionList connectionList={connectionList}/>
        </SafeAreaView>)
}

const ConnectionList = (props) => {
    const connectionList = props.connectionList;
    if (connectionList.length > 0) {
        const renderItem = ({item}) => (
            <ListItem id={item.id}/>
        );
        return (<FlatList data={connectionList} renderItem={renderItem}/>)
    }
    return <Text>{'No Histories.'}</Text>
}

export default Home;
