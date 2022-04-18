import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';
import i18n from 'i18n-js';

const TurnServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const props = [
    {
      type: ListItemType.input,
      label: i18n.t('turnServer_ipAddress'),
      onChange: (value) => {
        setIp(value);
      },
    },
    {
      type: ListItemType.input,
      label: i18n.t('turnServer_port'),
      onChange: (value) => {
        setPort(value);
      },
      keyboardType: 'numeric'
    },
    {
      type: ListItemType.input,
      label: i18n.t('turnServer_userName'),
      onChange: (value) => {
        setUserName(value);
      },
    },
    {
      type: ListItemType.input,
      label: i18n.t('turnServer_password'),
      onChange: (value) => {
        setPassword(value);
      },
    },
  ];

  const save = () => {
    navigation.navigate(Screens.createConnection, {
      turnServer: {
        ip: ip,
        port: port,
        username: userName,
        password: password,
      },
    });
  };

  return (
    <>
      <List listProps={props} defaultMarginTop/>
      <Button text={i18n.t('turnServer_save')} onPress={save} />
    </>
  );
};

export default TurnServer;
