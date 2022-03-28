import { FlatList, StyleSheet, View } from 'react-native';
import { Input } from './Input';
import React from 'react';
import { Select } from './Select';
import { Option } from './Option';

export const ListItemType = {
  select: 'select',
  input: 'input',
  option: 'option',
};

export const List = (props) => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case ListItemType.input:
        return (
          <Input
            label={item.label}
            required={item.required}
            get={(value) => item.get(value)}
          />
        );
      case ListItemType.select:
        return (
          <Select
            label={item.label}
            required={item.required}
            navigateTo={() => item.navigateTo()}
            selectedText={item.selectedText}
          />
        );
      case ListItemType.option:
        return <Option label={item.label} navigateTo={() => item.navigateTo()} />;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.props}
        renderItem={renderItem}
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
