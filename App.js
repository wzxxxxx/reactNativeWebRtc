/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import type {Node} from 'react';
import {
    DeviceEventEmitter,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TextInput,
    useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MediaStream, RTCView} from "react-native-webrtc";
import {initConnection} from "./webrtc";

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [text, setText] = useState('');
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const handleReceiveStream = useCallback(stream => {
        setRemoteStream(stream);
    }, [remoteStream]);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('stream', handleReceiveStream);
        return () => {
            listener.remove();
        }
    }, [handleReceiveStream]);

    const connect = async () => {
        await initConnection(text);
        // const stream = await mediaDevices.getUserMedia({ video: true });
        // setRemoteStream(stream);
    }

    return (
        <>
            <SafeAreaView style={styles.body}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <Text>Please enter user id.</Text>
                <TextInput style={styles.userIdInput} onChangeText={text => setText(text)}/>
                <Text onPress={connect}>Connect</Text>
                <RTCView streamURL={remoteStream?.toURL()} style={styles.video}/>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        ...StyleSheet.absoluteFill
    },
    userIdInput: {
        width: 100,
        height: 30,
        marginBottom: 30,
        backgroundColor: '#fff',
        borderColor: 'black',
    },
    video: {
        flex: 1,
    }
});

export default App;
