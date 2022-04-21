import { List } from '../components/List/List';
import { ListItemType } from '../components/List/List';
import React from 'react';
import { Screens } from '../Screens';
import i18n from 'i18n-js';

const Protocols = {
  http: 'http',
  https: 'https',
  ws: 'ws',
  wss: 'wss',
};

const Protocol = ({ route, navigation }) => {
  const protocol = route.params?.protocol;
  const props = [
    {
      type: ListItemType.option,
      label: i18n.t('protocol_http'),
      isSelected: protocol === Protocols.http,
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.http);
      },
    },
    {
      type: ListItemType.option,
      label: i18n.t('protocol_https'),
      isSelected: protocol === Protocols.https,
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.https);
      },
    },
    {
      type: ListItemType.option,
      label: i18n.t('protocol_ws'),
      isSelected: protocol === Protocols.ws,
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.ws);
      },
    },
    {
      type: ListItemType.option,
      label: i18n.t('protocol_wss'),
      isSelected: protocol === Protocols.wss,
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.wss);
      },
    },
  ];

  const navigateTo = (screen, protocol) => {
    navigation.navigate(screen, {
      protocol: protocol,
    });
  };

  return <List listProps={props} defaultMarginTop />;
};

export default Protocol;
