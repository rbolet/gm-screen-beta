import React, { useState } from 'react';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
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
      const buildToken = new Promise(() => {
        Object.keys(newTokenState).forEach(key => {
          switch (key) {
            case 'tokenId': setTokenId(newTokenState.tokenId); break;
            case 'imageFileName': setImageFileName(newTokenState.imageFileName); break;
            case 'tokenName': setTokenName(newTokenState.tokenName); break;
            case 'tokenDetails': setTokenDetails(newTokenState.tokenDetails); break;
          }
        });
      });
      buildToken.then(() => postToken(token));
    }
  };

  return (
    <Token.Provider value={{ token, updateToken }}>{props.children}</Token.Provider>
  );
}
