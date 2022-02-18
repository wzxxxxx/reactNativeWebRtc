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
    Text,
    useColorScheme, View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SingleLineInput} from "../components/SingleLineInput";
import {OutlineButton} from "../components/OutlineButton";
import { t } from 'react-native-tailwindcss';


const CreateConnection = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const serverUrlLabel = {label: 'Signal Server:'};
    const targetLabel = {label: 'Target ID:'};
    const connectProps = {text: 'Connect'};
    const [signalServerUrl, setSignalServerUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [stunServerUrl, setStunServerUrl] = useState('');
    const [turnServerUrl, setTurnServerUrl] = useState('');

    const connect = async () => {
        // if(!url) {
        //     alert('Please enter the server url');
        //     return;
        // }
        if(!userId) {
            alert('Please enter the user id');
            return;
        }
        navigation.navigate('Video', {
            signalServerUrl: signalServerUrl,
            id: userId,
            stunServerUrl: stunServerUrl,
            turnServerUrl: turnServerUrl
        });
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.white,
                ...StyleSheet.absoluteFill
            }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <Text>Signal Server</Text>
                <SingleLineInput label={'IP address:'} get={(value) => {setSignalServerUrl(value)}}/>
                <SingleLineInput label={'Port:'} get={(value) => {setSignalServerUrl(value)}}/>
                <SingleLineInput label={targetLabel.label} get={(value) => {setUserId(value)}}/>
                <Text>Stun Server</Text>
                <SingleLineInput label={'IP address:'} get={(value) => {setStunServerUrl(value)}}/>
                <SingleLineInput label={'Port:'} get={(value) => {setStunServerUrl(value)}}/>
                <Text>Turn Server</Text>
                <SingleLineInput label={'IP address:'} get={(value) => {setTurnServerUrl(value)}}/>
                <SingleLineInput label={'Port:'} get={(value) => {setTurnServerUrl(value)}}/>
                <View style={[t.flex, t.justifyAround, t.mT8, t.pL4, t.pR4]}>
                    <OutlineButton text={connectProps.text} onPress={connect}/>
                </View>
            </SafeAreaView>
        </>
    );
};

export default CreateConnection;
