import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { Session } from '@client/context/session-context';
import { TokenContext } from '@client/context/token-context';
import Header from './Header';
import Menu from './views/Menu';
import { configUserSocket } from '@client/lib/api';
import GMView from '@components/views/GMView';
import PlayerView from '@components/views/PlayerView';

function App() {
  const [CurrentView, setCurrentView] = useState(<Menu />);
  const { user, updateUser } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);
  const { session, updateSession } = useContext(Session);

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

  useEffect(() => {
    if (session.sessionId) {
      switch (user.userRole) {
        case 'gm': setCurrentView(<TokenContext><GMView /></TokenContext>); break;
        case 'player': setCurrentView(<TokenContext><PlayerView/></TokenContext>); break;
        default: setCurrentView(<Menu/>);
      }

    }
  }, [session.sessionId]);

  function connectSocket() {
    const socket = io('/');
    socket.on('connected', () => {
      updateUser({ socketId: socket.id });
    });

    socket.on('roomChange', room => {
      updateCampaign({ room });
    });

    socket.on('updateRoomList', roomUserList => {
      updateCampaign({ roomUserList });
    });

    socket.on('kick', message => {
      updateSession({
        sessionId: null,
        environmentImageFileName: null,
        tokens: []
      });

      updateCampaign({
        campaignId: null,
        campaingName: null,
        campaignGM: null
      })
        .then(() => updateCampaign({ campaignAssets: [] }))
        .catch(err => {
          console.error('Error clearing campaign', err);
        });
    });
    socket.on('updateSession', newSessionState => {
      updateSession(newSessionState);
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
