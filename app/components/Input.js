import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const Input = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
        {props.required && <Text style={{ color: 'red' }}> *</Text>}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => props.get(text)}
        autoCorrect={false}
        autoCapitalize={'none'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 100,
    marginLeft: 20,
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 50,
    fontSize: 18,
    color: 'black',
  },
});
