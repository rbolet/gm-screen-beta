import React, { useState, useContext } from 'react';
import { Session } from '@client/context/session-context';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const { session } = useContext(Session);

  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const token = { tokenId, imageFileName, tokenName, tokenDetails };

  const updateToken = (newTokenState, isNew) => {
    if (isNew) {
      setTokenId('new');
      setImageFileName(newTokenState.fileName);
      setTokenName(newTokenState.alias);
    } else {
      const buildToken = new Promise(resolve => {
        Object.keys(newTokenState).forEach(key => {
          switch (key) {
            case 'tokenId': setTokenId(newTokenState.tokenId); break;
            case 'imageFileName': setImageFileName(newTokenState.imageFileName); break;
            case 'tokenName': setTokenName(newTokenState.tokenName); break;
            case 'tokenDetails': setTokenDetails(newTokenState.tokenDetails); break;
          }
        });
        resolve(true);
      });
      buildToken.then(() => postToken(token, session.sessionId));
    }
  };

  return (
    <Token.Provider value={{ token, updateToken }}>{props.children}</Token.Provider>
  );
}
