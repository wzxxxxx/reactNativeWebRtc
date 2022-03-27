import { Button } from '../components/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const [connections, setConnections] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const historyString = await AsyncStorage.getItem('history');
      setConnections(historyString ? JSON.parse(historyString) : []);
    } catch (e) {
      alert(e);
    }
  };

  const openVideoPage = (item) => {
    alert(JSON.stringify(item.signalServer));
    navigation.navigate('Video', {
      id: item.id,
      signalServer: JSON.parse(item.signalServer),
      stunServer: JSON.parse(item.stunServer),
      turnServerUrl: item?.turnServer && JSON.parse(item?.turnServer),
    });
  };

  return (
    <SafeAreaView style={{
      backgroundColor: Colors.white,
      ...StyleSheet.absoluteFill,
    }}>
      <View style={{ padding: 20 }}>
        <Button text={'Create New Connection'} onPress={() => navigation.navigate('Create Connection')} />
        <Connections connections={connections} onPress={(item) => openVideoPage(item)} />
      </View>
    </SafeAreaView>);
};

const Connections = (props) => {
  const connections = props.connections;
  const onPressListItem = props.onPress;

  // const onPressListItem = async () => {
  //     navigation.navigate('Video', {
  //         id: userId,
  //         signalServer: signalServer,
  //         stunServer: stunServer,
  //         turnServerUrl: turnServer
  //     });
  // }

  // alert(JSON.stringify(connections));
  const renderItem = ({ item }) => (
    <ListItem item={item} onPress={(item) => onPressListItem(item)} />
  );
  return (<FlatList data={connections} renderItem={renderItem} keyExtractor={item => item.time}
                    ListEmptyComponent={() => (<Text style={{ marginTop: 100, alignItems: 'center' }} />)} />);
};

export default Home;
