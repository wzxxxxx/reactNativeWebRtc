import { List } from '../components/List/List';
import { ListItemType } from '../components/List/List';
import React from 'react';
import { Screens } from '../Screens';

const Protocols = {
  http: 'http',
  https: 'https',
  ws: 'ws',
  wss: 'wss',
};

const Protocol = ({ navigation }) => {
  const props = [
    {
      type: ListItemType.option,
      label: 'http',
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.http);
      },
    },
    {
      type: ListItemType.option,
      label: 'https',
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.https);
      },
    },
    {
      type: ListItemType.option,
      label: 'ws',
      navigateTo: () => {
        navigateTo(Screens.createConnection, Protocols.ws);
      },
    },
    {
      type: ListItemType.option,
      label: 'wss',
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
