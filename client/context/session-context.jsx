import React, { useState, useContext } from 'react';
import { Campaign } from '@client/context/campaign-context';
import { getSession } from '@client/lib/api';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const { campaign } = useContext(Campaign);
  const [session, setSession] = useState({ sessionId: null, environmentImageFileName: null, tokens: [] });

  const updateSession = changesObject => {
    if (!changesObject) {
      getSession(campaign.campaignId).then(session => setSession(session));
    }
  };

  return (
    <Session.Provider value={{ session, updateSession }}>{props.children}</Session.Provider>
  );
}
