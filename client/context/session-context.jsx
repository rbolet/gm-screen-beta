import React, { useState, useContext } from 'react';
import { Campaign } from '@client/context/campaign-context';
import { AppUser } from '@client/context/user-context';
import { joinSession, postEnvironment } from '@client/lib/api';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const { campaign } = useContext(Campaign);
  const { user } = useContext(AppUser);
  const [session, setSession] = useState({ sessionId: null, environmentImageFileName: null, tokens: [] });

  const updateSession = newSessionState => {
    if (!newSessionState) {
      joinSession(campaign, user)
        .then(session => { setSession(session); });
    } else {
      setSession(newSessionState);
    }
  };

  const postSession = newSessionState => {
    Object.keys(newSessionState).forEach(key => {
      switch (key) {
        case 'environmentImage':
          postEnvironment(session.sessionId, newSessionState.environmentImage)
            .then(jsonResult => jsonResult.json())
            .then(message => message)
            .catch(err => console.error('Error posting new environment', err));
          break;
        case 'hiddenToken':
          console.log(newSessionState);
          break;
      }
    });
  };

  return (
    <Session.Provider value={{ session, updateSession, postSession }}>{props.children}</Session.Provider>
  );
}
