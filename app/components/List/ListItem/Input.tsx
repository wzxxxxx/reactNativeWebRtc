import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// @ts-ignore
export const Input = ({ label, required, onChange, keyboardType, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: 'red' }}> *</Text>}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChange(text)}
        autoCorrect={false}
        autoCapitalize={'none'}
        keyboardType={keyboardType || 'default'}
        value={value || ''}
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
