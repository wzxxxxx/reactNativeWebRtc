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
import {SingleLineInput} from "./SingleLineInput";
import {OutlineButton} from "./OutlineButton";

const CreateConnection = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const serverUrlLabel = {label: 'Server Url:'};
    const targetLabel = {label: 'Target ID:'};
    const connectProps = {text: 'Connect'};
    const [url, setServerUrl] = useState('');
    const [userId, setUserId] = useState('');

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
            url: url,
            id: userId
        });

        // const stream = await mediaDevices.getUserMedia({ video: true });
        // setRemoteStream(stream);
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.white,
                ...StyleSheet.absoluteFill
            }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <SingleLineInput label={serverUrlLabel.label} get={(value) => {setServerUrl(value)}}/>
                <SingleLineInput label={targetLabel.label} get={(value) => {setUserId(value)}}/>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 30,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    <OutlineButton text={connectProps.text} onPress={connect}/>
                </View>
            </SafeAreaView>
        </>
    );
};

export default CreateConnection;
