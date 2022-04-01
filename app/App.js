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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create Connection" component={CreateConnection} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Protocol" component={Protocol} />
        <Stack.Screen name="Stun Server" component={StunServer} />
        <Stack.Screen name="Turn Server" component={TurnServer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
