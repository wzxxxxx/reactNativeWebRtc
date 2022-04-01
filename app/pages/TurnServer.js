import { View } from 'react-native';
import { List, ListItemType } from '../components/List/List';
import React from 'react';

const TurnServer = ({ navigation }) => {
  const props = [
    {
      type: ListItemType.input,
      label: 'IP address',
      onChange: (value) => {
        setConnectionParam(ConnectionParamType.turn, 'ip', value);
      },
    },
    {
      type: ListItemType.input,
      label: 'Port',
      onChange: (value) => {
        setConnectionParam(ConnectionParamType.turn, 'port', value);
      },
    },
    {
      type: ListItemType.input,
      label: 'UserName',
      onChange: (value) => {
        setConnectionParam(ConnectionParamType.turn, 'username', value);
      },
    },
    {
      type: ListItemType.input,
      label: 'Password',
      onChange: (value) => {
        setConnectionParam(ConnectionParamType.turn, 'password', value);
      },
    },
  ];

  return (
    <>
      <View style={{ marginTop: 20 }} />
      <List props={props} />
    </>
  );
};

export default TurnServer;
