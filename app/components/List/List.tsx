import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Input } from './ListItem/Input';
import React from 'react';
import { Select } from './ListItem/Select';
import { Option } from './ListItem/Option';
import { RNWFunctionComponent } from '../../App';

export const ListItemType: IListItemType = {
  select: 'select',
  input: 'input',
  option: 'option',
};

interface IListItemType {
  [key: string]: 'select' | 'input' | 'option';
}

interface ListPropsWrapper {
  listPropsCollection: ListProps[];
  defaultMarginTop?: boolean | undefined;
}

export interface ListProps {
  type: 'select' | 'input' | 'option';
  label: string;
  required?: boolean;
  onChange?: (value: string) => void;
  keyboardType?: string;
  value?: string;
  selectedOption?: string;
  isSelected?: boolean;
  navigateTo?: () => void;
}

interface IRenderItemProps<T> {
  item: T;
  index: number;
}

export const List: RNWFunctionComponent<ListPropsWrapper> = ({
  listPropsCollection,
  defaultMarginTop,
}) => {
  const renderItem = (renderItemProps: IRenderItemProps<ListProps>) => {
    const item = renderItemProps.item;
    switch (item.type) {
      case ListItemType.input:
        return (
          <Input
            label={item.label}
            required={item.required}
            onChange={(value: string) => item.onChange(value)}
            keyboardType={item.keyboardType}
            value={item.value}
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
        return (
          <Option
            label={item.label}
            isSelected={item.isSelected}
            navigateTo={() => item.navigateTo()}
          />
        );
      default:
        return (
          <View>
            <Text>{'No such type'}</Text>
          </View>
        );
    }
  };

  return (
    <View style={StyleSheet.flatten([styles.container, defaultMarginTop && { marginTop: 20 }])}>
      <FlatList
        style={styles.list}
        data={listPropsCollection}
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  list: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  separator: {
    width: '100%',
    marginLeft: 20,
    height: 1,
    backgroundColor: 'gainsboro',
  },
});
