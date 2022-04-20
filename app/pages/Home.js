import { Button } from '../components/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screens } from '../Screens';
import i18n from 'i18n-js';

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
    navigation.navigate(Screens.video, {
      id: item.id,
      signalServer: JSON.parse(item.signalServer),
      stunServer: JSON.parse(item.stunServer),
      turnServer: JSON.parse(item?.turnServer),
    });
  };

  return (
      <SafeAreaView
        style={{
          backgroundColor: Colors.white,
          ...StyleSheet.absoluteFill,
        }}
      >
        <Button
          text={i18n.t('createConnection_new')}
          onPress={() => navigation.navigate(Screens.createConnection)}
        />
        <Connections connections={connections} onPress={(item) => openVideoPage(item)} />
      </SafeAreaView>
  );
};

const Connections = (props) => {
  const connections = props.connections;
  const onPressListItem = props.onPress;

  const renderItem = ({ item }) => (
    <ListItem item={item} onPress={(item) => onPressListItem(item)} />
  );
  return (
    <FlatList
      data={connections}
      renderItem={renderItem}
      keyExtractor={(item) => item.time}
      ListEmptyComponent={() => <Text style={{ marginTop: 100, alignItems: 'center' }} />}
    />
  );
};

export default Home;
