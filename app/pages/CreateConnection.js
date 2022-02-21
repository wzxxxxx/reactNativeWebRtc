import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from "../components/Button";
import styled from "styled-components/native"
import {List} from "../components/List";

export const ListItemType = {
    select: 'select',
    input: 'input',
    option: 'option'
}

const CreateConnection = ({route, navigation}) => {

    const protocol = route.params?.protocol;

    const isDarkMode = useColorScheme() === 'dark';
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

    useEffect(() => {
        setSignalServerInfo('protocol', protocol);
    }, [])

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

    const signalServerProps = [{
        type: ListItemType.select,
        label: 'Protocol',
        required: true,
        navigateTo: () => {
            navigateTo('Protocol')
        },
        selectedText: protocol
    }, {
        type: ListItemType.input,
        label: 'IP address',
        required: true,
        get: (value) => {
            setSignalServerInfo('ip', value)
        }
    }, {
        type: ListItemType.input,
        label: 'Port',
        required: true,
        get: (value) => {
            setSignalServerInfo('port', value)
        }
    }];

    const targetIdProps = [{
        type: ListItemType.input,
        label: 'Target ID',
        required: true,
        get: (value) => {
            setUserId(value)
        }
    }];

    const stunServerProps = [{
        type: ListItemType.input,
        label: 'IP address',
        get: (value) => {
            setStunServerInfo('ip', value)
        }
    }, {
        type: ListItemType.input,
        label: 'Port',
        get: (value) => {
            setStunServerInfo('port', value)
        }
    }];

    const turnServerProps = [{
        type: ListItemType.input,
        label: 'IP address',
        get: (value) => {
            setTurnServerInfo('ip', value)
        }
    }, {
        type: ListItemType.input,
        label: 'Port',
        get: (value) => {
            setTurnServerInfo('port', value)
        }
    }];

    const connect = async () => {
        alert(JSON.stringify(signalServer))
        if (!userId) {
            alert('Please enter the user id');
            return;
        }
        navigation.navigate('Video', {
            id: userId,
            signalServer: signalServer,
            stunServer: stunServer,
            turnServerUrl: turnServer
        });
    }

    const navigateTo = (value) => {
        navigation.navigate(value);
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: Colors.gray,
                ...StyleSheet.absoluteFill
            }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <Spacer/>
                <List props={targetIdProps}/>
                <Title>Signal Server</Title>
                <List props={signalServerProps}/>
                <Title>Stun Server</Title>
                <List props={stunServerProps}/>
                <Title>Turn Server</Title>
                <List props={turnServerProps}/>
                <ButtonContainer>
                    <Button text={connectProps.text} onPress={connect}/>
                </ButtonContainer>
            </SafeAreaView>
        </>
    );
};

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 20px 10px;
`

const ButtonContainer = styled.View`
  padding: 0 20px;
  margin-top: 40px;
`

const Spacer = styled.View`
  margin-top: 20px;
`

export default CreateConnection;
