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
    Button,
    DeviceEventEmitter,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TextInput,
    useColorScheme, View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MediaStream, RTCView} from "react-native-webrtc";
import {initConnection} from "./webrtc";
import {SingleLineInput} from "./components/SingleLineInput";
import {OutlineButton} from "./components/OutlineButton";

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const serverUrlLabel = {label: 'Server Url:'};
    const targetLabel = {label: 'Target ID:'};
    const connectProps = {text: 'Connect'};
    const disconnectProps = {text: 'Disconnect'};
    const [url, setServerUrl] = useState('');
    const [userId, setUserId] = useState('');
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
        await initConnection(url, userId);
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
            <SafeAreaView style={styles.body}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <Text style={styles.title}>Create New Connection</Text>
                <SingleLineInput label={serverUrlLabel.label} setText={(value) => {setServerUrl(value)}}/>
                {/*<TextInput multiline={4} style={styles.userIdInput} onChangeText={url => setServerUrl(url)}/>*/}
                <SingleLineInput label={targetLabel.label} setText={(value) => {setUserId(value)}}/>
                {/*<TextInput style={styles.userIdInput} onChangeText={id => setUserId(id)}/>*/}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    {/*<OutlineButton {...disconnectProps} />*/}
                    <OutlineButton text={connectProps.text} />
                </View>
                {/*<Text onPress={connect}>Connect</Text>*/}
                {/*<Text onPress={disconnect}>Disconnect</Text>*/}
                {
                    remoteStream && <RTCView streamURL={remoteStream?.toURL()} style={styles.video}/>
                }
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        ...StyleSheet.absoluteFill
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        margin: 20,
    },
    userIdInput: {
        width: 100,
        height: 30,
        marginBottom: 30,
        fontSize: 18,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderBottomWidth: 1,
    },
    video: {
        flex: 1,
    }
});

export default App;
