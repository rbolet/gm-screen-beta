import React, { useState } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [token, setToken] = useState({});
  const [loading, isLoading] = useState(false);

  const newToken = async image => {
    setToken({
      tokenId: 'new',
      imageFileName: image.fileName,
      tokenName: image.alias,
      tokenDetails: '',
      hidden: 0
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
