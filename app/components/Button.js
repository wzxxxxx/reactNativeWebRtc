import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Button = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: 'limegreen',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
