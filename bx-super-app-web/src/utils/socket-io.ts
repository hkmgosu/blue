/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { apiUrl } from 'config';
import io, { Socket } from 'socket.io-client';

export let socket: Socket;
export const initiateSocket = (room: string) => {
  socket = io(encodeURI(String(apiUrl)), {
    path: '/api/cross/payments/callback/websocket',
    reconnectionAttempts: 3,
  });
  console.log(`Connecting socket...`);
  socket.on('connect', function () {
    console.log('connected');
    if (socket && room)
      socket.emit('createRoom', {
        oc: room,
      });
  });
  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
export const subscribeToPayment = (cb: any) => {
  socket.on('paymentStatus', (msg) => {
    console.log('Websocket payment received! ' + JSON.stringify(msg));
    return cb(msg);
  });
};
export const subscribeToRoom = (cb: any) => {
  if (socket)
    socket.on('createRoom', (msg) => {
      console.log('joined to ', msg);
      return cb(msg);
    });
};
