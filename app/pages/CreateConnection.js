/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme, View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {InputWithLabel} from "../components/InputWithLabel";
import {Button} from "../components/Button";
import styled from "styled-components/native"

const CreateConnection = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const targetLabel = {label: 'Target ID:'};
    const connectProps = {text: 'Connect'};
    const [signalServer, setSignalServer] = useState({
        protocol: '',
        ip: '',
        port: ''
    });
    const [userId, setUserId] = useState('');
    const [stunServer, setStunServer] = useState({
        ip: '',
        port: ''
    });
    const [turnServer, setTurnServer] = useState({
        ip: '',
        port: ''
    });

    const connect = async () => {
        if(!userId) {
            alert('Please enter the user id');
            return;
        }
        navigation.navigate('Video', {
            signalServer: signalServer,
            id: userId,
            stunServer: stunServer,
            turnServerUrl: turnServer
        });
    }

    const setSignalServerInfo = (key, value) => {
        setSignalServer(prev => {
            prev[key] = value;
            return prev;
        })
    }

    const setStunServerInfo = (key, value) => {
        setStunServer(prev => {
            prev[key] = value;
            return prev;
        })
    }

    const setTurnServerInfo = (key, value) => {
        setTurnServer(prev => {
            prev[key] = value;
            return prev;
        })
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.white,
                ...StyleSheet.absoluteFill
            }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <Title>Signal Server</Title>
                <InputWithLabel label={'Protocol:'} get={(value) => {setSignalServerInfo('protocol', value)}}/>
                <InputWithLabel label={'IP address:'} get={(value) => {setSignalServerInfo('ip', value)}}/>
                <InputWithLabel label={'Port:'} get={(value) => {setSignalServerInfo('port', value)}}/>

                <InputWithLabel label={targetLabel.label} get={(value) => {setUserId(value)}}/>

                <Title>Stun Server</Title>
                <InputWithLabel label={'IP address:'} get={(value) => {setStunServerInfo('ip', value)}}/>
                <InputWithLabel label={'Port:'} get={(value) => {setStunServerInfo('port', value)}}/>

                <Title>Turn Server</Title>
                <InputWithLabel label={'IP address:'} get={(value) => {setTurnServerInfo('ip', value)}}/>
                <InputWithLabel label={'Port:'} get={(value) => {setTurnServerInfo('port', value)}}/>
                <View>
                    <Button text={connectProps.text} onPress={connect}/>
                </View>
            </SafeAreaView>
        </>
    );
};

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  padding: 10px;
`

export default CreateConnection;
