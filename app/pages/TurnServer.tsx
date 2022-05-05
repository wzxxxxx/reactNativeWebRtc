import { List, ListItemType } from '../components/List/List';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';
import { TranslationContext } from '../App';
import { PortInputType } from '../model/ConnectionModel';

// @ts-ignore
const TurnServer = ({ route, navigation }) => {
  const t = useContext(TranslationContext);
  const [ip, setIp] = useState<string>('');
  const [port, setPort] = useState<PortInputType>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const turnServerInfo = route.params;
    if (turnServerInfo) {
      setIp(turnServerInfo.ip);
      setPort(turnServerInfo.port);
      setUserName(turnServerInfo.username);
      setPassword(turnServerInfo.password);
    }
  }, [route.params]);

  const props = [
    {
      type: ListItemType.input,
      label: t('turnServer_ipAddress'),
      onChange: (value: string) => {
        setIp(value);
      },
      value: ip,
    },
    {
      type: ListItemType.input,
      label: t('turnServer_port'),
      onChange: (value: string) => {
        setPort(value ? Number(value) : '');
      },
      keyboardType: 'numeric',
      value: String(port),
    },
    {
      type: ListItemType.input,
      label: t('turnServer_userName'),
      onChange: (value: string) => {
        setUserName(value);
      },
      value: userName,
    },
    {
      type: ListItemType.input,
      label: t('turnServer_password'),
      onChange: (value: string) => {
        setPassword(value);
      },
      value: password,
    },
  ];

  const save = () => {
    navigation.navigate(Screens.createConnection, {
      turnServer: {
        ip: ip,
        port: port,
        username: userName,
        password: password,
      },
    });
  };

  return (
    <>
      <List listPropsCollection={props} defaultMarginTop />
      <Button text={t('turnServer_save')} onPress={save} />
    </>
  );
};

export default TurnServer;
