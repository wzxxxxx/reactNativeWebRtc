import { List } from '../components/List/List';
import { ListItemType } from '../components/List/List';
import React, { useContext } from 'react';
import { Screens } from '../Screens';
import { TranslationContext } from '../App';
import { Protocol } from '../model/ConnectionModel';

const Protocols = {
  http: 'http',
  https: 'https',
  ws: 'ws',
  wss: 'wss',
};

// @ts-ignore
const ProtocolScreen = ({ route, navigation }) => {
  const t = useContext(TranslationContext);
  const protocol: Protocol = route.params;
  const props = [
    {
      type: ListItemType.option,
      label: t('protocol_http'),
      isSelected: protocol === Protocols.http,
      navigateTo: () => {
        navigation.navigate(Screens.createConnection, { protocol: Protocols.http });
      },
    },
    {
      type: ListItemType.option,
      label: t('protocol_https'),
      isSelected: protocol === Protocols.https,
      navigateTo: () => {
        navigation.navigate(Screens.createConnection, { protocol: Protocols.https });
      },
    },
    {
      type: ListItemType.option,
      label: t('protocol_ws'),
      isSelected: protocol === Protocols.ws,
      navigateTo: () => {
        navigation.navigate(Screens.createConnection, { protocol: Protocols.ws });
      },
    },
    {
      type: ListItemType.option,
      label: t('protocol_wss'),
      isSelected: protocol === Protocols.wss,
      navigateTo: () => {
        navigation.navigate(Screens.createConnection, { protocol: Protocols.wss });
      },
    },
  ];

  return <List listPropsCollection={props} defaultMarginTop />;
};

export default ProtocolScreen;
