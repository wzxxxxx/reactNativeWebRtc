import { List, ListItemType } from '../components/List/List';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';
import i18n from 'i18n-js';

const StunServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const props = [
    {
      type: ListItemType.input,
      label: i18n.t('stunServer_ipAddress'),
      onChange: (value) => {
        setIp(value);
      },
    },
    {
      type: ListItemType.input,
      label: i18n.t('stunServer_port'),
      onChange: (value) => {
        setPort(value);
      },
      keyboardType: 'numeric',
    },
  ];

  const save = () => {
    navigation.navigate(Screens.createConnection, {
      stunServer: {
        ip: ip,
        port: port,
      },
    });
  };

  return (
    <>
      <List listProps={props} defaultMarginTop />
      <Button text={i18n.t('stunServer_save')} onPress={save} />
    </>
  );
};

export default StunServer;
