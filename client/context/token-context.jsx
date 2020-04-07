import React, { useState, useEffect } from 'react';

export const Token = React.createContext(null);

export function TokenContext(props) {
  const [tokenId, setTokenId] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenDetails, setTokenDetails] = useState('');
  const [hidden, setHidden] = useState(0);

  const [loading, setLoading] = useState(false);

  const newToken = image => {

    setTokenId('new');
    setImageFileName(image.fileName);
    setTokenName(image.alias);
    setTokenDetails('');
    setHidden(0);

  };

  const updateToken = async (newState, isNew) => {
    setLoading(true);
    if (isNew) {
      newToken(newState);
    } else {
      await Object.keys(newState).forEach(key => {
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

  let token = { tokenId, imageFileName, tokenName, tokenDetails, hidden };
  useEffect(() => {
    const setToken = new Promise(() => { token = { tokenId, imageFileName, tokenName, tokenDetails, hidden }; });
    setToken.then(p => { setLoading(false); });
  }, [tokenId, tokenName, tokenDetails, hidden]);

  return (
    <Token.Provider value={{ loading, token, updateToken } }>{props.children}</Token.Provider>
  );
}
