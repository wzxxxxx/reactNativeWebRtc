import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';

const StunServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

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
  ];

  const save = () => {
    navigation.navigate(Screens.createConnection, {
      stunServer: {
        ip: ip,
        port: port,
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

export default StunServer;
