import React, { Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { List, ListItemType, ListProps } from '../components/List/List';
import { Screens } from '../Screens';
import { TranslationContext } from '../App';
import {
  PortInputType,
  Protocol,
  SignalServerConfig,
  StunServerConfig,
  TurnServerConfig,
} from '../model/ConnectionModel';
import { isEmptyObject } from '../utils/util';

interface SignalServerConfigTypes {
  [key: string]: Protocol | string | PortInputType | undefined;
}

interface SignalServerAction<T extends SignalServerConfigTypes> {
  type: string;
  payload: T;
}

interface StunServerAction {
  type: string;
  payload: StunServerConfig;
}

interface TurnServerAction {
  type: string;
  payload: TurnServerConfig;
}

// @ts-ignore
const CreateConnection = ({ route, navigation }) => {
  const t = useContext(TranslationContext);

  const protocol: Protocol = route.params?.protocol;
  const stunServerInfo: StunServerConfig = route.params?.stunServer;
  const turnServerInfo: TurnServerConfig = route.params?.turnServer;

  const [stunServerText, setStunServerText] = useState<string>('');
  const [turnServerText, setTurnServerText] = useState<string>('');

  const signalServerReducer = (
    state: SignalServerConfig,
    action: SignalServerAction<SignalServerConfigTypes>
  ): SignalServerConfig => {
    switch (action.type) {
      case 'setSignalServerConfig':
        return Object.assign(state, action.payload);
      default:
        throw new Error();
    }
  };

  const stunServerReducer = (
    state: StunServerConfig,
    action: { type: string; payload: StunServerConfig }
  ) => {
    switch (action.type) {
      case 'setStunServerConfig':
        return Object.assign(state, action.payload);
      default:
        throw new Error();
    }
  };

  const turnServerReducer = (
    state: TurnServerConfig,
    action: { type: string; payload: TurnServerConfig }
  ) => {
    switch (action.type) {
      case 'setTurnServerConfig':
        return Object.assign(state, action.payload);
      default:
        throw new Error();
    }
  };

  const [signalServerConfig, setSignalServerConfig] = useReducer<
    Reducer<SignalServerConfig, SignalServerAction<SignalServerConfigTypes>>
  >(signalServerReducer, {
    protocol: 'http',
    ip: '',
    port: '',
  });

  const [stunServerConfig, setStunServerConfig] = useReducer<
    Reducer<StunServerConfig, StunServerAction>
  >(stunServerReducer, {
    ip: '',
    port: '',
  });

  const [turnServerConfig, setTurnServerConfig] = useReducer<
    Reducer<TurnServerConfig, TurnServerAction>
  >(turnServerReducer, {
    ip: '',
    port: '',
    username: '',
    password: '',
  });

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (protocol) {
      setSignalServerConfig({ type: 'setSignalServerConfig', payload: { protocol: protocol } });
    }
  }, [protocol]);

  useEffect(() => {
    if (stunServerInfo !== undefined && !isEmptyObject(stunServerInfo)) {
      const u = `${stunServerInfo.ip}:${stunServerInfo.port}`;
      setStunServerText(u);
      setStunServerConfig({ type: 'setStunServerConfig', payload: stunServerInfo });
    }
  }, [stunServerInfo]);

  useEffect(() => {
    if (turnServerInfo !== undefined && !isEmptyObject(turnServerInfo)) {
      let u = `${turnServerInfo.ip}:${turnServerInfo.port}`;
      if (turnServerInfo.username && turnServerInfo.password) {
        u = `${u}[${turnServerInfo.username}:${turnServerInfo.password}]`;
      }
      setTurnServerText(u);
      setTurnServerConfig({ type: 'setTurnServerConfig', payload: turnServerInfo });
    }
  }, [turnServerInfo]);

  const signalServerProps: ListProps[] = [
    {
      type: 'select',
      label: t('createConnection_protocol'),
      required: true,
      navigateTo: () => {
        navigation.navigate(Screens.protocol, signalServerConfig.protocol);
      },
      selectedOption: signalServerConfig.protocol,
    },
    {
      type: 'input',
      label: t('createConnection_ipAddress'),
      required: true,
      onChange: (value) => {
        setSignalServerConfig({ type: 'setSignalServerConfig', payload: { ip: value } });
      },
    },
    {
      type: ListItemType.input,
      label: t('createConnection_port'),
      required: true,
      onChange: (value) => {
        setSignalServerConfig({ type: 'setSignalServerConfig', payload: { port: value } });
      },
      keyboardType: 'numeric',
    },
  ];

  const targetIdProps: ListProps[] = [
    {
      type: ListItemType.input,
      label: t('createConnection_targetId'),
      required: true,
      onChange: (value) => {
        setUserId(String(value));
      },
    },
  ];

  const stunServerProps = [
    {
      type: ListItemType.select,
      label: t('createConnection_stunServer'),
      navigateTo: () => {
        navigation.navigate(Screens.stunServer, stunServerConfig);
      },
      selectedOption: stunServerText,
    },
  ];

  const turnServerProps = [
    {
      type: ListItemType.select,
      label: t('createConnection_turnServer'),
      navigateTo: () => {
        navigation.navigate(Screens.turnServer);
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
      signalServer: signalServerConfig,
      stunServer: stunServerConfig,
      turnServer: turnServerConfig,
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.gray,
        flex: 1,
      }}
    >
      <List listPropsCollection={targetIdProps} defaultMarginTop />
      <Text style={styles.title}>{t('createConnection_signalServer')}</Text>
      <List listPropsCollection={signalServerProps} />
      <List listPropsCollection={stunServerProps} defaultMarginTop />
      <List listPropsCollection={turnServerProps} defaultMarginTop />
      <Button text={t('createConnection_connect')} onPress={connect} />
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
