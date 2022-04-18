import React from 'react';
import type Node from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateConnection from './pages/CreateConnection';
import { NavigationContainer } from '@react-navigation/native';
import Video from './pages/Video';
import Home from './pages/Home';
import Protocol from './pages/Protocol';
import StunServer from './pages/StunServer';
import TurnServer from './pages/TurnServer';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { Screens } from './Screens';

const translationGetters = {
  en: () => require('./i18n/en-us.json'),
  zh: () => require('./i18n/zh-cn.json'),
};

const setI18nConfig = () => {
  const fallback = { languageTag: 'en' };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

const App: () => Node = () => {
  setI18nConfig();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTintColor: 'limegreen',
          headerTitleStyle: {
            color: 'black',
          },
        }}
      >
        <Stack.Screen name={Screens.home} component={Home} options={{ title: i18n.t('home') }} />
        <Stack.Screen
          name={Screens.createConnection}
          component={CreateConnection}
          options={{ title: i18n.t('createConnection') }}
        />
        <Stack.Screen name={Screens.video} component={Video} options={{ title: i18n.t('video') }} />
        <Stack.Screen
          name={Screens.protocol}
          component={Protocol}
          options={{ title: i18n.t('protocol') }}
        />
        <Stack.Screen
          name={Screens.stunServer}
          component={StunServer}
          options={{ title: i18n.t('stunServer') }}
        />
        <Stack.Screen
          name={Screens.turnServer}
          component={TurnServer}
          options={{ title: i18n.t('turnServer') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
