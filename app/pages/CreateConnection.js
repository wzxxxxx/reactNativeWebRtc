import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { List, ListItemType } from '../components/List/List';
import { Screens } from '../Screens';
import i18n from 'i18n-js';

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
      label: i18n.t('createConnection_protocol'),
      required: true,
      navigateTo: () => {
        navigateTo(Screens.protocol, protocolText);
      },
      selectedOption: protocolText,
    },
    {
      type: ListItemType.input,
      label: i18n.t('createConnection_ipAddress'),
      required: true,
      onChange: (value) => {
        setConnectionParameter(ConnectionParamType.signal, 'ip', value);
      },
    },
    {
      type: ListItemType.input,
      label: i18n.t('createConnection_port'),
      required: true,
      onChange: (value) => {
        setConnectionParameter(ConnectionParamType.signal, 'port', value);
      },
      keyboardType: 'numeric',
    },
  ];

  const targetIdProps = [
    {
      type: ListItemType.input,
      label: i18n.t('createConnection_targetId'),
      required: true,
      onChange: (value) => {
        setUserId(value);
      },
    },
  ];

  const stunServerProps = [
    {
      type: ListItemType.select,
      label: i18n.t('createConnection_stunServer'),
      navigateTo: () => {
        navigateTo(Screens.stunServer);
      },
      selectedOption: stunServerText,
    },
  ];

  const turnServerProps = [
    {
      type: ListItemType.select,
      label: i18n.t('createConnection_turnServer'),
      navigateTo: () => {
        navigateTo(Screens.turnServer);
      },
      selectedOption: turnServerText,
    },
  ];

  const connect = async () => {
    if (!userId) {
      alert('Please enter the user id');
      return;
    }
    navigation.navigate(Screens.video, {
      id: userId,
      signalServer: signalServer,
      stunServer: stunServer,
      turnServer: turnServer,
    });
  };

  const navigateTo = (value, protocolText) => {
    navigation.navigate(value, { protocol: protocolText });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.gray,
        ...StyleSheet.absoluteFill,
        flex: 1,
      }}
    >

      <List listProps={targetIdProps} defaultMarginTop />
      <Text style={styles.title}>{i18n.t('createConnection_signalServer')}</Text>
      <List listProps={signalServerProps} />
      <List listProps={stunServerProps} defaultMarginTop />
      <List listProps={turnServerProps} defaultMarginTop />
      <Button text={i18n.t('createConnection_connect')} onPress={connect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: 'gray',
    marginTop: 30,
    marginLeft: 32,
    marginBottom: 10,
  },
});

export default CreateConnection;
