import { FlatList, StyleSheet, View } from 'react-native';
import { Input } from './ListItem/Input';
import React from 'react';
import { Select } from './ListItem/Select';
import { Option } from './ListItem/Option';

export const ListItemType = {
  select: 'select',
  input: 'input',
  option: 'option',
};

export const List = ({ listProps, defaultMarginTop }) => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case ListItemType.input:
        return (
          <Input
            label={item.label}
            required={item.required}
            onChange={(value) => item.onChange(value)}
            keyboardType={item.keyboardType}
          />
        );
      case ListItemType.select:
        return (
          <Select
            label={item.label}
            required={item.required}
            navigateTo={() => item.navigateTo()}
            selectedOption={item.selectedOption}
          />
        );
      case ListItemType.option:
        return <Option label={item.label} navigateTo={() => item.navigateTo()} />;
      default:
        break;
    }
  };

  return (
    <View style={StyleSheet.flatten([styles.container, defaultMarginTop && { marginTop: 20 }])}>
      <FlatList
        data={listProps}
        renderItem={renderItem}
        alwaysBounceVertical={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gainsboro',
  },
});
