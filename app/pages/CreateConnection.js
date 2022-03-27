import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet, Text,
  useColorScheme, View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { List, ListItemType } from '../components/List';

const CreateConnection = ({ route, navigation }) => {

  const protocol = route.params?.protocol;

  const isDarkMode = useColorScheme() === 'dark';
  const connectProps = { text: 'Connect' };
  const [signalServer, setSignalServer] = useState({
    protocol: '',
    ip: '',
    port: '',
  });
  const [userId, setUserId] = useState('');
  const [stunServer, setStunServer] = useState({
    ip: '',
    port: '',
  });
  const [turnServer, setTurnServer] = useState({
    ip: '',
    port: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    setSignalServerInfo('protocol', protocol);
  }, [protocol]);

  const setSignalServerInfo = (key, value) => {
    setSignalServer(prev => {
      prev[key] = value;
      return prev;
    });
  };

  const setStunServerInfo = (key, value) => {
    setStunServer(prev => {
      prev[key] = value;
      return prev;
    });
  };

  const setTurnServerInfo = (key, value) => {
    setTurnServer(prev => {
      prev[key] = value;
      return prev;
    });
  };

  const signalServerProps = [{
    type: ListItemType.select,
    label: 'Protocol',
    required: true,
    navigateTo: () => {
      navigateTo('Protocol');
    },
    selectedText: protocol,
  }, {
    type: ListItemType.input,
    label: 'IP address',
    required: true,
    get: (value) => {
      setSignalServerInfo('ip', value);
    },
  }, {
    type: ListItemType.input,
    label: 'Port',
    required: true,
    get: (value) => {
      setSignalServerInfo('port', value);
    },
  }];

  const targetIdProps = [{
    type: ListItemType.input,
    label: 'Target ID',
    required: true,
    get: (value) => {
      setUserId(value);
    },
  }];

  const stunServerProps = [{
    type: ListItemType.input,
    label: 'IP address',
    get: (value) => {
      setStunServerInfo('ip', value);
    },
  }, {
    type: ListItemType.input,
    label: 'Port',
    get: (value) => {
      setStunServerInfo('port', value);
    },
  }];

  const turnServerProps = [{
    type: ListItemType.input,
    label: 'IP address',
    get: (value) => {
      setTurnServerInfo('ip', value);
    },
  }, {
    type: ListItemType.input,
    label: 'Port',
    get: (value) => {
      setTurnServerInfo('port', value);
    },
  }, {
    type: ListItemType.input,
    label: 'UserName',
    get: (value) => {
      setTurnServerInfo('username', value);
    },
  }, {
    type: ListItemType.input,
    label: 'Password',
    get: (value) => {
      setTurnServerInfo('password', value);
    },
  }];

  const connect = async () => {
    if (!userId) {
      alert('Please enter the user id');
      return;
    }
    navigation.navigate('Video', {
      id: userId,
      signalServer: signalServer,
      stunServer: stunServer,
      turnServerUrl: turnServer,
    });
  };

  const navigateTo = (value) => {
    navigation.navigate(value);
  };

  return (
    <>
      <SafeAreaView style={{
        backgroundColor: Colors.gray,
        ...StyleSheet.absoluteFill,
      }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{marginTop: 20}} />
        <List props={targetIdProps} />
        <Text style={styles.title}>Signal Server</Text>
        <List props={signalServerProps} />
        <Text style={styles.title}>Stun Server</Text>
        <List props={stunServerProps} />
        <Text style={styles.title}>Turn Server</Text>
        <List props={turnServerProps} />
        <View style={{marginTop: 40, paddingLeft: 20, paddingRight: 20}}>
          <Button text={connectProps.text} onPress={connect} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    margin: 20
  },
});

export default CreateConnection;
