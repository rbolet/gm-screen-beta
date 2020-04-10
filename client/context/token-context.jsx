import React, { useState, useEffect, useContext } from 'react';
import { Session } from '@client/context/session-context';
import { Campaign } from '@client/context/campaign-context';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const { session, updateSession } = useContext(Session);
  const { campaign } = useContext(Campaign);

  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(null);
  const [visibleTo, setVisibleTo] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const updateToken = async (newState, isNew) => {
    if (isNew) {
      setTokenId('new'); setImageFileName(newState.fileName); setTokenName(newState.alias);
    } else if (newState === 'clear') {
      setTokenId(null); setImageFileName(null); setTokenName('');
      setTokenDetails(''); setHidden(null); setVisibleTo([]);
    } else {
      Object.keys(newState).forEach(key => {
        switch (key) {
          case 'tokenId': setTokenId(newState[key]); break;
          case 'imageFileName': setImageFileName(newState[key]); break;
          case 'tokenName': setTokenName(newState[key]); break;
          case 'tokenDetails': setTokenDetails(newState[key]); break;
          case 'hidden':
            if (hidden === null) {
              setHidden(newState[key]);
            } else if (!hidden) {
              setVisibleTo([campaign.campaignGM]);
              setHidden(true);
            } else {
              setVisibleTo([]);
              setHidden(false);
            }
            break;
          case 'visibleTo': setVisibleTo(newState[key]); break;
        }
      });
    }
  };

  const postCurrentToken = () => { setFetch(true); };

  useEffect(() => {
    if (fetch && tokenId) {
      setLoading(true);
      updateSession({ tokens: [] });
      postToken({ tokenId, imageFileName, tokenName, tokenDetails, hidden, visibleTo }, session.sessionId)
        .then(p => {
          updateToken('clear');
          setFetch(false)
          ;
        })
        .then(p => setLoading(false));
    }
  }, [fetch]);

  return (
    <Token.Provider
      value={{
        token: {
          tokenId,
          imageFileName,
          tokenName,
          tokenDetails,
          hidden,
          visibleTo
        },
        updateToken,
        postCurrentToken,
        loading
      }}>
      {props.children}
    </Token.Provider>
  );
}
