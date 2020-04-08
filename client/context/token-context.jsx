import React, { useState, useEffect } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(0);
  let token = {};

  const updateToken = async (newState, isNew) => {
    if (isNew) {
      setTokenId('new'); setImageFileName(newState.fileName); setTokenName(newState.alias);
    } else if (newState === 'clear') {
      setTokenId(null); setImageFileName(null); setTokenName('');
      setTokenDetails(''); setHidden(0);
    } else {
      Object.keys(newState).forEach(key => {
        switch (key) {
          case 'tokenId': setTokenId(newState[key]); break;
          case 'imageFileName': setImageFileName(newState[key]); break;
          case 'tokenName': setTokenName(newState[key]); break;
          case 'tokenDetails': setTokenDetails(newState[key]); break;
          case 'hidden': setHidden(newState[key]); break;
        }
      });
    }
  };

  useEffect(() => {
    token = { tokenId, imageFileName, tokenName, tokenDetails, hidden };
  }, [tokenId, imageFileName, tokenName, tokenDetails, hidden]);
  return (
    <Token.Provider value={{ token, updateToken }}>{props.children}</Token.Provider>
  );
}
