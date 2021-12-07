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
    Text,
    useColorScheme, View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MediaStream, RTCView} from "react-native-webrtc";
import {initConnection} from "../webrtc";
import {SingleLineInput} from "./SingleLineInput";
import {OutlineButton} from "./OutlineButton";

const Home: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const serverUrlLabel = {label: 'Server Url:'};
    const targetLabel = {label: 'Target ID:'};
    const connectProps = {text: 'Connect'};
    const disconnectProps = {text: 'Disconnect'};
    const [url, setServerUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [remoteStream, setRemoteStream] = useState(null);
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
        // if (!url) {
        //     alert('Please enter the server url');
        //     return;
        // }
        // if (!userId) {
        //     alert('Please enter the user id');
        //     return;
        // }
        // await initConnection(url, userId);
        // const stream = await mediaDevices.getUserMedia({ video: true });
        // setRemoteStream(stream);
    }

    const disconnect = () => {
        if (remoteStream) {
            remoteStream.release();
            setRemoteStream(null);
        }
    };

    return (
        <>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <Text style={{
                fontSize: 28,
                fontWeight: '800',
                margin: 20,
            }}>Create New Connection</Text>
            <SingleLineInput label={serverUrlLabel.label} get={(value) => {
                setServerUrl(value)
            }}/>
            <SingleLineInput label={targetLabel.label} get={(value) => {
                setUserId(value)
            }}/>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20
            }}>
                <OutlineButton text={connectProps.text} connect={connect}/>
            </View>
            {
                remoteStream && <RTCView streamURL={remoteStream?.toURL()} style={{
                    flex: 1
                }}/>
            }
        </>
    );
};

export default Home;
