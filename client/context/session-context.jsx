import React, { useState, useEffect, useContext } from 'react';
import { Campaign } from '@client/context/campaign-context';
import { getSession } from '@client/lib/api';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const [session, setSession] = useState({ sessionId: null, environmentImageFileName: null, tokens: [] });

  const { campaign } = useContext(Campaign);

  useEffect(() => {
    if (campaign.campaignId) setSession(getSession(campaign.campaignId));
  }, [campaign.campaignId]);

  return (
    <Session.Provider value={{ session }}>{props.children}</Session.Provider>
  );
}
