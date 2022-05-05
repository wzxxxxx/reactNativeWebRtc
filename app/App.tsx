import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateConnection from './pages/CreateConnection';
import { NavigationContainer } from '@react-navigation/native';
import Video from './pages/Video';
import Home from './pages/Home';
import ProtocolScreen from './pages/ProtocolScreen';
import StunServer from './pages/StunServer';
import TurnServer from './pages/TurnServer';
import * as RNLocalize from 'react-native-localize';
import { Screens } from './Screens';
import { isEmptyObject } from './utils/util';

export type RNWFunctionComponent<T> = React.FunctionComponent<T>;

interface Translations {
  [key: string]: string;
}

interface TranslationGetters {
  [key: string]: () => Translations;
}

type TranslationCallback = (key: string) => string;

export const TranslationContext = React.createContext<TranslationCallback>(
  () => '[Missing translation]'
);

export default () => {
  const [translations, setTranslations] = useState<Translations | null>(null);

  const t: TranslationCallback = (key: string) => {
    return translations !== null && !isEmptyObject(translations)
      ? translations[key]
      : '[Missing translation]';
  };

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const translationGetters: TranslationGetters = {
      en: () => require('./i18n/en-us.json'),
      zh: () => require('./i18n/zh-cn.json'),
    };

    (function initTranslations() {
      const fallback = { languageTag: 'en' };
      const { languageTag } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
      setTranslations(translationGetters[languageTag]());
    })();
  }, []);

  return (
    <TranslationContext.Provider value={t}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: 'limegreen',
            headerTitleStyle: {
              color: 'black',
            },
          }}
        >
          <Stack.Screen name={Screens.home} component={Home} options={{ title: t('home') }} />
          <Stack.Screen
            name={Screens.createConnection}
            component={CreateConnection}
            options={{ title: t('createConnection') }}
          />
          <Stack.Screen name={Screens.video} component={Video} options={{ title: t('video') }} />
          <Stack.Screen
            name={Screens.protocol}
            component={ProtocolScreen}
            options={{ title: t('protocol') }}
          />
          <Stack.Screen
            name={Screens.stunServer}
            component={StunServer}
            options={{ title: t('stunServer') }}
          />
          <Stack.Screen
            name={Screens.turnServer}
            component={TurnServer}
            options={{ title: t('turnServer') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationContext.Provider>
  );
};
