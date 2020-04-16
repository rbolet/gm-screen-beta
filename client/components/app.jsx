/* eslint-disable no-console */
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
  const [infoMessages, setInfoMessages] = useState([]);

  const { user, updateUser } = useContext(AppUser);
  const { campaign, updateCampaign } = useContext(Campaign);
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
    if (session.sessionId === campaign.room) {
      switch (user.userRole) {
        case 'gm': setCurrentView(<TokenContext><GMView /></TokenContext>); break;
        case 'player': setCurrentView(<TokenContext><PlayerView/></TokenContext>); break;
        default: setCurrentView(<Menu/>);
      }

    }
  }, [session.sessionId, campaign.room]);

  function connectSocket() {
    const socket = io('/');
    socket.on('connected', () => {
      updateUser({ socketId: socket.id });
    });

    socket.on('roomChange', room => {
      console.log(`"roomChange" -  room: ${room}`);
      updateCampaign({ room });
    });

    socket.on('updateRoomList', roomUserList => {
      console.log('"UpdateRoomList" - ', roomUserList);
      updateCampaign({ roomUserList });
    });

    socket.on('kick', message => {
      console.log('"kick" - ', message);
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
      console.log('"updateSession" - ', newSessionState);
      updateSession(newSessionState);
    });

    socket.on('updateHidden', hiddenToken => {
      console.log('"updateHidden" - ', hiddenToken);
      updateSession({ hiddenToken });
    });

    socket.on('kick', info => {
      console.log('"kick"', info);
      addInfoMessage(info.message);
    });

    socket.on('info', info => {
      console.log('"info"', info);
      addInfoMessage(info.message);
    });

    socket.on('connect_error', error => {
      console.error('connect_error:', error);
    });

    socket.on('connect_timeout', timeout => {
      console.error('connect_timeout:', timeout);
    });

    socket.on('error', error => {
      console.error('io error:', error);
    });
  }

  const addInfoMessage = message => {
    setInfoMessages(prevMessages => [message, ...prevMessages]);
  };

  return (
    <div>
      <Header infoMessages={infoMessages}/>
      {CurrentView}
    </div>
  );
}

export default App;
