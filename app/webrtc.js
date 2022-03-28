import io from 'socket.io-client';
import { RTCPeerConnection } from 'react-native-webrtc';
import { DeviceEventEmitter } from 'react-native';

export function initConnection(targetSocketId, signalServer, stunServer?, turnServer?) {
  const signalServerUrl = `${signalServer.protocol}://${signalServer.ip}:${signalServer.port}`;
  alert(JSON.stringify(turnServer));
  const config = {};
  if (stunServer && stunServer.ip && stunServer.port) {
    const stunServerUrl = `stun:${stunServer.ip}:${stunServer.port}`;
    config.iceServers = [];
    config.iceServers.push({ urls: stunServerUrl });
  }
  if (turnServer && turnServer.ip && turnServer.port) {
    const turnServerUrl = `turn:${turnServer.ip}:${turnServer.port}`;
    // if (!config.iceServers) config.iceServers = [];
    const serverInfo = { urls: turnServerUrl };
    // config.iceServers.push({urls: turnServerUrl});
    if (turnServer.username && turnServer.password) {
      serverInfo.username = turnServer.username;
      serverInfo.credential = turnServer.password;
    }
    config.iceServers.push(serverInfo);
  }
  let socketId = uuid();
  let localPeerConnection = new RTCPeerConnection(config);
  const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1,
  };
  const socket = io(signalServerUrl);
  socket.on('connect', () => {
    socket.send(socketId);
  });
  socket.on('connect_error', () => {
    console.log('connect_error');
  });
  socket.on('answer', (desc) => {
    console.log('I got answer: ', desc);
    localPeerConnection.setRemoteDescription(desc?.offer);
  });
  socket.on('onicecandidate', (candidate) => {
    localPeerConnection.addIceCandidate(candidate);
  });

  localPeerConnection.addEventListener('icecandidate', (event) => {
    console.log('I got my icecandidate info');
    if (event.candidate) {
      console.log(event.candidate.candidate);
    }
    const message = {
      srcId: socketId,
      dstId: targetSocketId,
      candidate: event.candidate,
    };
    socket.emit('onicecandidate', message);
  });
  localPeerConnection.addEventListener('iceconnectionstatechange', (event) => {
    if (localPeerConnection) {
      console.log(`ICE state: ${localPeerConnection.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
  });

  localPeerConnection.addEventListener('addstream', (event) => {
    const stream = localPeerConnection.getRemoteStreams()[0];
    DeviceEventEmitter.emit('stream', stream);
  });
  localPeerConnection.createOffer(offerOptions).then((offer) => {
    localPeerConnection.setLocalDescription(offer);
    const message = {
      srcId: socketId,
      dstId: targetSocketId,
      offer: offer,
    };
    socket.emit('offer', message);
  });
}

function uuid() {
  let s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}
