import React, { useState } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');

  const updateToken = (newTokenState, isNew) => {
    if (isNew) {
      setTokenId('new');
      setImageFileName(newTokenState.fileName);
      setTokenName(newTokenState.alias);
    } else {
      Object.keys(newTokenState).forEach(key => {
        switch (key) {
          case 'tokenId': setTokenId(newTokenState.tokenId); break;
          case 'imageFileName': setImageFileName(newTokenState.imageFileName); break;
          case 'tokenName': setTokenName(newTokenState.tokenName); break;
          case 'tokenDetails': setTokenDetails(newTokenState.tokenDetails); break;
        }
      });
    }
  };

  const token = { tokenId, imageFileName, tokenName, tokenDetails };

  return (
    <Token.Provider value={{ token, updateToken }}>{props.children}</Token.Provider>
  );
}
