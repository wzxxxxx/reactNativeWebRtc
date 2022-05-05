import { Button } from '../components/Button';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import ListItem from '../components/ListItem';
import { Screens } from '../Screens';
import { RNWFunctionComponent, TranslationContext } from '../App';
import { AsyncStorageKeys, getLocalItem } from '../utils/Storage';
import { ConnectionRecord } from '../model/ConnectionModel';

// @ts-ignore
const Home = ({ navigation }) => {
  const t = useContext(TranslationContext);

  const [connectionRecords, setConnectionRecords] = useState<ConnectionRecord[]>([]);

  useEffect(() => {
    (async function f() {
      const histories = await getLocalItem(AsyncStorageKeys.HISTORY, true);
      setConnectionRecords(histories !== null ? histories : []);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Button
        text={t('createConnection_new')}
        onPress={() => navigation.navigate(Screens.createConnection)}
      />
      <ConnectionRecords
        connections={connectionRecords}
        onPressListItem={(item: ConnectionRecord) => navigation.navigate(Screens.video, item)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

interface ConnectionRecordsProps {
  connections: ConnectionRecord[];
  onPressListItem: (item: ConnectionRecord) => void;
}

interface ConnectionRecordListItemProps<T> extends RNWFunctionComponent<T>, ListRenderItem<T> {}

export const ConnectionRecords: RNWFunctionComponent<ConnectionRecordsProps> = ({
  connections,
  onPressListItem,
}) => {
  const renderItem: ConnectionRecordListItemProps<ConnectionRecord> = (item) => (
    <ListItem item={item} onPress={(item: ConnectionRecord) => onPressListItem(item)} />
  );
  return (
    <FlatList
      data={connections}
      renderItem={renderItem}
      keyExtractor={(item: ConnectionRecord) => item.time}
      ListEmptyComponent={() => <Text style={{ marginTop: 100, alignItems: 'center' }} />}
    />
  );
};

export default Home;
