import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Button = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchArea} onPress={() => onPress()}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
    paddingLeft: 12,
    paddingRight: 12
  },
  touchArea: {
    width: '100%',
    height: 40,
    backgroundColor: 'limegreen',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
