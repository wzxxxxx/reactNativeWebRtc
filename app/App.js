/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateConnection from "./components/CreateConnection";
import {NavigationContainer} from "@react-navigation/native";
import Video from "./components/Video";
import Home from "./components/Home";

const App: () => Node = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Create Connection" component={CreateConnection} />
                <Stack.Screen name="Video" component={Video} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
