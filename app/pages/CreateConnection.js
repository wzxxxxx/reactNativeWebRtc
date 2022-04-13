import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { List, ListItemType } from '../components/List/List';

const ConnectionParamType = {
  signal: 'signal',
  stun: 'stun',
  turn: 'turn',
};

const CreateConnection = ({ route, navigation }) => {
  const protocol = route.params?.protocol;
  const stunServerInfo = route.params?.stunServer;
  const turnServerInfo = route.params?.turnServer;

  const [protocolText, setProtocolText] = useState('');
  const [stunServerText, setStunServerText] = useState('');
  const [turnServerText, setTurnServerText] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

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
    if (protocol) {
      setConnectionParameter(ConnectionParamType.signal, 'protocol', protocol);
      setProtocolText(protocol);
    }
  }, [protocol]);

  useEffect(() => {
    if (stunServerInfo) {
      const u = `${stunServerInfo.ip}:${stunServerInfo.port}`;
      setStunServerText(u);
      for (const key in stunServerInfo) {
        setConnectionParameter(ConnectionParamType.stun, key, stunServerInfo[key]);
      }
    }
  }, [stunServerInfo]);

  useEffect(() => {
    if (turnServerInfo) {
      alert(JSON.stringify(turnServerInfo));
      let u = `${turnServerInfo.ip}:${turnServerInfo.port}`;
      if (turnServerInfo.username && turnServerInfo.password) {
        u = `${u}[${turnServerInfo.username}:${turnServerInfo.password}]`;
      }
      setTurnServerText(u);
      for (const key in turnServerInfo) {
        setConnectionParameter(ConnectionParamType.turn, key, turnServerInfo[key]);
      }
    }
  }, [turnServerInfo]);

  const setConnectionParameter = (server, key, value) => {
    const f = (prev) => {
      prev[key] = value;
      return prev;
    };
    switch (server) {
      case ConnectionParamType.signal:
        setSignalServer(f);
        break;
      case ConnectionParamType.stun:
        setStunServer(f);
        break;
      case ConnectionParamType.turn:
        setTurnServer(f);
        break;
      default:
        break;
    }
  };

  const signalServerProps = [
    {
      type: ListItemType.select,
      label: 'Protocol',
      required: true,
      navigateTo: () => {
        navigateTo('Protocol');
      },
      selectedText: protocolText,
    },
    {
      type: ListItemType.input,
      label: 'IP address',
      required: true,
      onChange: (value) => {
        setConnectionParameter(ConnectionParamType.signal, 'ip', value);
      },
      keyboardType: 'numeric'
    },
    {
      type: ListItemType.input,
      label: 'Port',
      required: true,
      onChange: (value) => {
        setConnectionParameter(ConnectionParamType.signal, 'port', value);
      },
      keyboardType: 'numeric'
    },
  ];

  const targetIdProps = [
    {
      type: ListItemType.input,
      label: 'Target ID',
      required: true,
      onChange: (value) => {
        setUserId(value);
      },
    },
  ];

  const stunServerProps = [
    {
      type: ListItemType.select,
      label: 'Stun Server',
      navigateTo: () => {
        navigateTo('Stun Server');
      },
      selectedText: stunServerText,
    },
  ];

  const turnServerProps = [
    {
      type: ListItemType.select,
      label: 'Turn Server',
      navigateTo: () => {
        navigateTo('Turn Server');
      },
      selectedText: turnServerText,
    },
  ];

  const connect = async () => {
    if (!userId) {
      alert('Please enter the user id');
      return;
    }
    navigation.navigate('Video', {
      id: userId,
      signalServer: signalServer,
      stunServer: stunServer,
      turnServer: turnServer,
    });
  };

  const navigateTo = (value) => {
    navigation.navigate(value);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.gray,
        ...StyleSheet.absoluteFill,
        flex: 1,
      }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ marginTop: 20 }} />
      <List props={targetIdProps} />
      <Text style={styles.title}>Signal Server</Text>
      <List props={signalServerProps} />
      <View style={{ marginTop: 20 }} />
      <List props={stunServerProps} />
      <View style={{ marginTop: 20 }} />
      <List props={turnServerProps} />
      <Button text={'Connect'} onPress={connect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default CreateConnection;
