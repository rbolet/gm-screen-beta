import React, { useState, useContext, useEffect } from 'react';
import { Session } from '@client/context/session-context';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(0);

  const [loading, setLoading] = useState(false);
  const { session } = useContext(Session);
  let token = { tokenId, imageFileName, tokenName, tokenDetails, hidden };

  useEffect(() => {
    token = { tokenId, imageFileName, tokenName, tokenDetails, hidden };
    if (tokenId) {
      postToken(token, session.sessionId).then(setLoading(false));
    }
  }, [tokenId, tokenName, tokenDetails, imageFileName, hidden]);

  const newToken = async image => {
    setToken({
      tokenId: 'new',
      imageFileName: image.fileName,
      tokenName: image.alias,
      tokenDetails: ''
    });
  };

  const modifyToken = async newState => {
    Object.keys(newState).forEach(key => {
      switch (key) {
        case 'tokenId':
          setTokenId(newState[key]); break;
        case 'tokenName':
          setTokenName(newState[key]); break;
        case 'imageFileName':
          setImageFileName(newState[key]); break;
        case 'tokenDetails':
          setTokenDetails(newState[key]); break;
        case 'hidden':
          setHidden(newState[key]); break;
      }
    });
  };

  const updateToken = async (newState, isNew) => {
    setLoading(true);
    if (isNew) {
      newToken(newState);
    } else {
      if (newState === 'clear') {
        setTokenId(null); setImageFileName(null); setTokenName('');
        setTokenDetails(''); setHidden(0);
      } else {
        modifyToken(newState);
      }
    }
  };

  return (
    <Token.Provider value={{ loading, token, updateToken } }>{props.children}</Token.Provider>
  );
}
