import { List, ListItemType } from '../components/List/List';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Screens } from '../Screens';
import { TranslationContext } from '../App';
import { isEmptyObject } from '../utils/util';
import { PortInputType } from '../model/ConnectionModel';

// @ts-ignore
const StunServer = ({ route, navigation }) => {
  const t = useContext(TranslationContext);

  const [ip, setIp] = useState<string>('');
  const [port, setPort] = useState<PortInputType>('');

  useEffect(() => {
    const stunServerInfo = route.params;
    if (stunServerInfo !== null && !isEmptyObject(stunServerInfo)) {
      setIp(stunServerInfo.ip);
      setPort(stunServerInfo.port);
    }
  }, [route.params]);

  const props = [
    {
      type: ListItemType.input,
      label: t('stunServer_ipAddress'),
      onChange: (value: string) => {
        setIp(value);
      },
      value: ip,
    },
    {
      type: ListItemType.input,
      label: t('stunServer_port'),
      onChange: (value: string) => {
        setPort(value ? Number(value) : '');
      },
      keyboardType: 'numeric',
      value: String(port),
    },
  ];

  return (
    <>
      <List listPropsCollection={props} defaultMarginTop />
      <Button
        text={t('stunServer_save')}
        onPress={() => {
          navigation.navigate(Screens.createConnection, {
            stunServer: {
              ip: ip,
              port: port,
            },
          });
        }}
      />
    </>
  );
};

export default StunServer;
