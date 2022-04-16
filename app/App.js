import React from 'react';
import type Node  from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateConnection from './pages/CreateConnection';
import { NavigationContainer } from '@react-navigation/native';
import Video from './pages/Video';
import Home from './pages/Home';
import Protocol from './pages/Protocol';
import StunServer from './pages/StunServer';
import TurnServer from './pages/TurnServer';
import { Screens } from './Screens';

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: 'limegreen',
          headerTitleStyle: {
            color: 'black',
          },
        }}
      >
        <Stack.Screen name={Screens.home} component={Home} />
        <Stack.Screen name={Screens.createConnection} component={CreateConnection} />
        <Stack.Screen name={Screens.video} component={Video} />
        <Stack.Screen name={Screens.protocol} component={Protocol} />
        <Stack.Screen name={Screens.stunServer} component={StunServer} />
        <Stack.Screen name={Screens.turnServer} component={TurnServer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
