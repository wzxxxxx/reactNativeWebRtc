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
            url: signalServerUrl,
            id: userId
        });
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.white,
                ...StyleSheet.absoluteFill
            }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <SingleLineInput label={serverUrlLabel.label} get={(value) => {setSignalServerUrl(value)}}/>
                <SingleLineInput label={targetLabel.label} get={(value) => {setUserId(value)}}/>
                <SingleLineInput label={'Stun Server:'} get={(value) => {setStunServerUrl(value)}}/>
                <SingleLineInput label={'Turn Server:'} get={(value) => {setTurnServerUrl(value)}}/>
                <View style={[t.flex, t.justifyAround, t.mT8, t.pL4, t.pR4]}>
                    <OutlineButton text={connectProps.text} onPress={connect}/>
                </View>
            </SafeAreaView>
        </>
    );
};

export default CreateConnection;
