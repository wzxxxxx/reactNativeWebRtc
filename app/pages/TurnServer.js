import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';

const TurnServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const props = [
    {
      type: ListItemType.input,
      label: 'IP address',
      onChange: (value) => {
        setIp(value);
      },
      keyboardType: 'numeric'
    },
    {
      type: ListItemType.input,
      label: 'Port',
      onChange: (value) => {
        setPort(value);
      },
      keyboardType: 'numeric'
    },
    {
      type: ListItemType.input,
      label: 'UserName',
      onChange: (value) => {
        setUserName(value);
      },
    },
    {
      type: ListItemType.input,
      label: 'Password',
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
      <Button text={'Save'} onPress={save} />
    </>
  );
};

export default TurnServer;
