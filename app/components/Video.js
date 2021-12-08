import {DeviceEventEmitter, StyleSheet} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {initConnection} from "../webrtc";
import {RTCView} from "react-native-webrtc";
import {Colors} from "react-native/Libraries/NewAppScreen";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {OutlineButton} from "./OutlineButton";

const Video = ({route}) => {
    const {url, id} = route.params;
    const [remoteStream, setRemoteStream] = useState(null);
    const handleReceiveStream = useCallback(stream => {
        setRemoteStream(stream);
    }, [remoteStream]);
    useEffect(() => {
        initConnection(url, id);
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
                    remoteStream && <RTCView streamURL={remoteStream?.toURL()} style={{flex: 1}}/>
                }
                <OutlineButton text={"Disconnect"} onPress={disconnect}/>
            </SafeAreaView>
        </>
    );
}

export default Video;