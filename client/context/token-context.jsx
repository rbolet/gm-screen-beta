import React, { useState, useEffect } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(0);

  const [loading, isLoading] = useState(false);

  const newToken = async image => {
    setToken({
      tokenId: 'new',
      imageFileName: image.fileName,
      tokenName: image.alias,
      tokenDetails: ''
    });
  };

  const modifyToken = async newTokenState => {
    setToken(Object.assign(token, newTokenState));
  };

  const updateToken = async (newState, isNew) => {
    isLoading(true);
    if (isNew) {
      newToken(newState).then(p => isLoading(false));
    } else {
      if (newState === 'clear') setToken({});
      modifyToken(newState)
        .then(p => isLoading(false));
    }
  };

  return (
    <Token.Provider value={{ loading, token, updateToken } }>{props.children}</Token.Provider>
  );
}
