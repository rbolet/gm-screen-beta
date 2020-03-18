import './App.css';
import io from 'socket.io-client';
import React, { useState, useEffect, useContext } from 'react';
import { AppUser } from '@client/context/user-context';
import Header from './Header';
import Menu from './views/Menu';
// import GMView from './views/GMView';

function App() {
  const [CurrentView] = useState(<Menu/>);
  const { user, updateUser } = useContext(AppUser);

  useEffect(() => {
    const reduceToBoolean = (acc, cur) => Boolean(acc && cur);
    const allButSocketId = [];

    for (const property in user) {
      if (property !== 'socketId') allButSocketId.push(user[property]);
    }
    const userLoggedIn = allButSocketId.reduce(reduceToBoolean);
    if (userLoggedIn) connectSocket();
  }, [user.userId]);

  function connectSocket() {
    const socket = io('/');
    socket.on('connected', () => {
      updateUser({ socketId: socket.id });
    });
  }

  return (
    <div>
      <Header/>
      {CurrentView}
    </div>
  );
}

export default App;
