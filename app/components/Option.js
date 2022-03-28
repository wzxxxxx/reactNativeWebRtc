import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Option = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigateTo()}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  label: {
    width: 100,
    marginLeft: 20,
    fontSize: 18,
  },
});
