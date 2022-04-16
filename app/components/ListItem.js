import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ListItem = (props) => {
  const { id, signalServer, stunServer, turnServer } = props.item;
  const onPressListItem = props.onPress;
  const signalServerStr = `${JSON.parse(signalServer)?.protocol}://${
    JSON.parse(signalServer)?.ip
  }:${JSON.parse(signalServer)?.port}`;
  const stunServerStr = `stun:${JSON.parse(stunServer)?.ip}:${JSON.parse(stunServer)?.port}`;
  let turnServerStr;
  if (turnServer) {
    turnServerStr = `turn:${JSON.parse(turnServer)?.ip}:${JSON.parse(turnServer)?.port}`;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPressListItem(props.item)}>
      <Text style={styles.text}>{id}</Text>
      <Text style={styles.text}>Signal Server: {signalServerStr}</Text>
      <Text style={styles.text}>Stun Server: {stunServerStr}</Text>
      <Text style={styles.text}>Turn Server: {turnServerStr}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 100,
    paddingLeft: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  text: {
    width: '100%',
  },
});

export default ListItem;
