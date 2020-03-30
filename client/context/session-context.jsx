import React, { useState, useContext } from 'react';
import { Campaign } from '@client/context/campaign-context';
import { getSession } from '@client/lib/api';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const { campaign } = useContext(Campaign);
  const [session, setSession] = useState({ sessionId: null, environmentImageFileName: null, tokens: [] });
  const [loading, setLoading] = useState(true);

  const updateSession = changesObject => {
    setLoading(true);
    if (!changesObject) {
      getSession(campaign.campaignId)
        .then(session => { setSession(session); setLoading(false); });
    }
  };

  return (
    <Session.Provider value={{ session, loading, updateSession }}>{props.children}</Session.Provider>
  );
}
