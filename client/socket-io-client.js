import io from 'socket.io-client';

export function connectSocket() {
  const socket = io('/');

  return socket;
}
