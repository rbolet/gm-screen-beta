import React, { useState } from 'react';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [token, setToken] = useState({
    tokenId: null,
    imageFileName: null,
    tokenName: '',
    tokenDetails: ''
  });

  const updateToken = (token, isNew) => {
    const thisToken = isNew
      ? {
        tokenId: 'new',
        imageFileName: token.fileName,
        tokenName: token.alias,
        tokenDetails: ''
      } : token;
    setToken(thisToken);
  };

  const addToken = async () => postToken(token);

  return (
    <Token.Provider value={{ token, updateToken, addToken }}>{props.children}</Token.Provider>
  );
}
