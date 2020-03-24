import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AppUser } from '@client/context/user-context';
import { Session } from '@client/context/session-context';
import Header from './Header';
import Menu from './views/Menu';
import { configUserSocket } from '@client/lib/api';
// import GMView from './views/GMView';

function App() {
  const [CurrentView] = useState(<Menu />);
  const { user, updateUser } = useContext(AppUser);
  const { updateSession } = useContext(Session);

  useEffect(() => {
    const reduceToBoolean = (acc, cur) => Boolean(acc && cur);
    const allButSocketId = [];

    for (const property in user) {
      if (property !== 'socketId') allButSocketId.push(user[property]);
    }
    const userLoggedIn = allButSocketId.reduce(reduceToBoolean);
    if (user.socketId) {
      configUserSocket(user);
    } else if (userLoggedIn) {
      connectSocket();
    }
  }, [user.userId, user.socketId]);

  function connectSocket() {
    const socket = io('/');
    socket.on('connected', () => {
      updateUser({ socketId: socket.id });
    });

    socket.on('roomChange', room => {
      updateSession({ room });
    });

    socket.on('updateRoomList', roomUserList => {
      updateSession({ roomUserList });
    });
  }

  return (
    <div>
      <Header />
      {CurrentView}
    </div>
  );
}

export default App;
