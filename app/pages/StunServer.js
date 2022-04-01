import {Button, Text, View} from 'react-native';
import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';

const StunServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const props = [
    {
      type: ListItemType.input,
      label: 'IP address',
      onChange: (value) => {
        console.log(value);
        // alert(value);
        setIp(value);
        console.log(ip);
      },
    },
    {
      type: ListItemType.input,
      label: 'Port',
      onChange: (value) => {
        setPort(value);
      },
    },
  ];

  const save = () => {
    console.log(ip + '---------');
    // navigation.navigate('Create Connection', {
    //   stunServer: {
    //     ip: ip,
    //     port: port,
    //   },
    // });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={save} title="Save" color="limegreen" />,
    });
  }, [navigation]);

  return (
    <>
      <View style={{ marginTop: 20 }} />
      <List props={props} />
      <Text>{ip}</Text>
    </>
  );
};

export default StunServer;
