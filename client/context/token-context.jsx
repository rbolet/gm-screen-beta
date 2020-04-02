import React, { useState, useContext } from 'react';
import { Session } from '@client/context/session-context';
import { postToken } from '@client/lib/api';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const { session } = useContext(Session);
  const [token, setToken] = useState({});
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

  const updateToken = (newState, isNew) => {
    isLoading(true);
    if (isNew) {
      newToken(newState).then(p => isLoading(false));
    } else {
      modifyToken(newState)
        .then(p => {
          postToken(token, session.sessionId);
        })
        .then(p => isLoading(false));
    }
  };

  return (
    <Token.Provider value={{ loading, token, updateToken } }>{props.children}</Token.Provider>
  );
}
