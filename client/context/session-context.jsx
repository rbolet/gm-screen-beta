/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Campaign } from '@client/context/campaign-context';
import { AppUser } from '@client/context/user-context';
import { joinSession, postEnvironment } from '@client/lib/api';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const { campaign } = useContext(Campaign);
  const { user } = useContext(AppUser);
  const [sessionId, setSessionId] = useState(null);
  const [environmentImageFileName, setEnvironmentImageFileName] = useState(null);
  const [tokens, setTokens] = useState([]);

  const updateSession = newSessionState => {
    if (!newSessionState) {
      joinSession(campaign, user)
        .then(session => { updateSession(session); });
    } else {
      Object.keys(newSessionState).forEach(key => {
        switch (key) {
          case 'sessionId': setSessionId(newSessionState[key]); break;
          case 'environmentImageFileName': setEnvironmentImageFileName(newSessionState[key]); break;
          case 'tokens': setTokens(newSessionState[key]); break;
        }
      });
    }
  };

  const postSession = newSessionState => {
    Object.keys(newSessionState).forEach(key => {
      switch (key) {
        case 'environmentImage':
          postEnvironment(sessionId, newSessionState.environmentImage)
            .then(jsonResult => jsonResult.json())
            .then(message => message)
            .catch(err => console.error('Error posting new environment', err));
          break;
      }
    });
  };

  return (
    <Session.Provider value={{
      session: {
        sessionId,
        environmentImageFileName,
        tokens
      },
      updateSession,
      postSession
    }}>{props.children}</Session.Provider>
  );
}
