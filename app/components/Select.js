import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Select = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}
        {
          props.required && <Text style={{ color: 'red' }}> *</Text>
        }</Text>
      <TouchableOpacity style={styles.touchArea}
                        onPress={() => props.navigateTo()}><Text
        style={styles.selected}>{props.selectedText}</Text></TouchableOpacity>
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
  touchArea: {
    width: 'auto',
    flex: 1,
    paddingRight: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selected: {
    width: 'auto',
    marginRight: 5,
    color: 'gray',
    fontSize: 18,
  },
  arrow: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'gainsboro',
    transform: 'rotate(45deg)'
  }
});

