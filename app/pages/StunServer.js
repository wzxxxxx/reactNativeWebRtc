import { View } from 'react-native';
import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';
import { Button } from '../components/Button';

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
    navigation.navigate('Create Connection', {
      stunServer: {
        ip: ip,
        port: port,
      },
    });
  };

  return (
    <>
      <View style={{ marginTop: 20 }} />
      <List props={props} />
      <Button text={'Save'} onPress={save} />
    </>
  );
};

export default StunServer;
