import './MainDisplay.css';
import React, { useContext, useState, useEffect } from 'react';
import { Session } from '@client/context/session-context';
import CloseButton from '@components/UI/CloseButton';

export default function MainDisplay() {
  const { session, postSession } = useContext(Session);
  const [Tokens, setTokens] = useState(null);
  const [environmentFilePath, setEnvironmentFilePath] = useState(null);

  useEffect(() => {
    if (session.tokens.length) {
      const tokenElements = session.tokens.map(token => {
        return (
          <div
            key={token.tokenId}
            style={{ backgroundImage: `url(./images/${token.imageFileName})` }}
            className="token mx-2 position-relative">
            <div className="token-name-footer px-1 py-0 m-0">
              <p>{token.tokenName}</p>
            </div>
          </div>
        );
      });
      setTokens(tokenElements);
    }
  }, [session.tokens]);

  useEffect(() => {
    if (session.environmentImageFileName) {
      setEnvironmentFilePath(`url(./images/${session.environmentImageFileName})`);
    } else {
      setEnvironmentFilePath(null);
    }
  }, [session.environmentImageFileName]);

  return (
    <div className="environment-image"
      style={{ backgroundImage: environmentFilePath }}>
      <CloseButton onCloseClick={() => {
        postSession({ environmentImage: { fileName: null, category: 'Environment' } });
      }}
      icon={<i className="far fa-times-circle"/>}/>
      <div className="tokens-container">
        {Tokens}
      </div>
    </div>
  );
}
