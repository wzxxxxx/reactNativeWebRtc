import { DeviceEventEmitter, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { initConnection } from '../webrtc';
import { RTCView } from 'react-native-webrtc';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

const Video = ({ route }) => {
  const { id, signalServer, stunServer, turnServer } = route.params;
  const [remoteStream, setRemoteStream] = useState(null);
  const handleReceiveStream = useCallback(
    async (stream) => {
      setRemoteStream(stream);
      setHistoryRecord();
    },
    [remoteStream]
  );

  const setHistoryRecord = async () => {
    try {
      const historyString = await AsyncStorage.getItem('history');
      const history = historyString ? JSON.parse(historyString) : [];
      history.unshift({
        id: id,
        signalServer: JSON.stringify(signalServer),
        stunServer: JSON.stringify(stunServer),
        turnServer: JSON.stringify(turnServer),
        time: new Date().getTime(),
      });
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initConnection(id, signalServer, stunServer, turnServer);
  }, []);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('stream', handleReceiveStream);
    return () => {
      listener.remove();
    };
  }, [handleReceiveStream]);

  const disconnect = () => {
    if (remoteStream) {
      remoteStream.release();
      setRemoteStream(null);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.white,
          ...StyleSheet.absoluteFill,
        }}
      >
        {remoteStream && <RTCView streamURL={remoteStream?.toURL()} style={{ flex: 1 }} />}
        <Button text={i18n.t('video_disconnect')} onPress={disconnect} />
      </SafeAreaView>
    </>
  );
};

export default Video;
