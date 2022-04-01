import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export function Select(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
        {
          props.required && <Text style={{ color: 'red' }}> *</Text>
        }
      </Text>
      <TouchableOpacity
        style={styles.touchArea}
        onPress={() => props.navigateTo()}
      >
        <Text
          style={styles.selected}
        >
          {props.selectedText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'gainsboro',
    transform: 'rotate(45deg)',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginLeft: 20,
    width: 100,
  },
  selected: {
    color: 'gray',
    fontSize: 18,
    marginRight: 5,
    width: 'auto',
  },
  touchArea: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-end',
    paddingRight: 20,
    width: 'auto',
  },
});
