import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconCheck from '../../../svgs/IconCheck';

export const Option = ({ label, isSelected, navigateTo }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigateTo()}>
      <Text style={styles.label}>{label}</Text>
      {isSelected && <IconCheck />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  label: {
    width: 100,
    marginLeft: 20,
    fontSize: 18,
  },
});
