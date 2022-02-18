import {DeviceEventEmitter, StyleSheet} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {initConnection} from "../webrtc";
import {RTCView} from "react-native-webrtc";
import {Colors} from "react-native/Libraries/NewAppScreen";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {OutlineButton} from "../components/OutlineButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'react-native-tailwindcss';

const Video = ({route}) => {
    const {signalServerUrl, id, stunServerUrl, turnServerUrl} = route.params;
    const [remoteStream, setRemoteStream] = useState(null);

    const handleReceiveStream = useCallback(async stream => {
        setRemoteStream(stream);
        setHistoryRecord();
    }, [remoteStream]);

    const setHistoryRecord = async () => {
        try {
            const historyString = await AsyncStorage.getItem('history');
            const history = historyString ? JSON.parse(historyString) : [];
            history.push({id: id, time: new Date().getTime()});
            await AsyncStorage.setItem('history', JSON.stringify(history));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        initConnection(signalServerUrl, id, stunServerUrl, turnServerUrl);
    }, []);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('stream', handleReceiveStream);
        return () => {
            listener.remove();
        }
    }, [handleReceiveStream]);

    const disconnect = () => {
        if (remoteStream) {
            remoteStream.release();
            setRemoteStream(null);
        }
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.white,
                ...StyleSheet.absoluteFill
            }}>
                {
                    remoteStream && <RTCView streamURL={remoteStream?.toURL()} style={[t.flex1]}/>
                }
                <OutlineButton text={"Disconnect"} onPress={disconnect}/>
            </SafeAreaView>
        </>
    );
}

export default Video;
