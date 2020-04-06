import React, { useState } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(0);
  const [loading, isLoading] = useState(false);

  const newToken = async image => {
    setTokenId('new');
    setImageFileName(image.fileName);
    setTokenName(image.alias);
  };

  const modifyToken = async newState => {
    Object.keys(newState).forEach(key => {
      switch (key) {
        case 'tokenId':
          setTokenId(newState.tokenId); break;
        case 'tokenName':
          setTokenName(newState.tokenName); break;
        case 'imageFileName':
          setImageFileName(newState.imageFileName); break;
        case 'tokenDetails':
          setTokenDetails(newState.tokenDetails); break;
        case 'hidden':
          setHidden(newState.hidden); break;
      }
    });
  };

  const updateToken = async (newState, isNew) => {
    isLoading(true);
    if (isNew) {
      newToken(newState).then(p => isLoading(false));
    } else {
      if (newState === 'clear') {
        setTokenId(null); setImageFileName(null); setTokenName('');
        setTokenDetails(''); setHidden(0);
      } else {
        modifyToken(newState)
          .then(p => isLoading(false));
      }
    }
  };

  const token = { tokenId, imageFileName, tokenName, tokenDetails, hidden };
  return (
    <Token.Provider value={{ loading, token, updateToken } }>{props.children}</Token.Provider>
  );
}
