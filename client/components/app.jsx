import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { AppUser } from '@client/context/user-context';
import Header from './Header';
import Menu from './views/Menu';
import { connectSocket } from '@client/sockett-io-client';
// import GMView from './views/GMView';

function App() {
  const [CurrentView] = useState(<Menu/>);
  const { user, updateUser } = useContext(AppUser);

  useEffect(() => {
    const reduceToBoolean = (acc, cur) => Boolean(acc && cur);
    const allButSocketId = [];
    const userLoggedIn = allButSocketId.reduce(reduceToBoolean);

    for (const property in user) {
      if (property !== 'socketId') allButSocketId.push(user[property]);
    }
    if (userLoggedIn) updateUser({ socketId: connectSocket().id });
  }, [user.userId, user.socketId]);

  return (
    <div>
      <Header/>
      {CurrentView}
    </div>
  );
}

export default App;
