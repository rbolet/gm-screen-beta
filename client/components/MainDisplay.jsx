import './MainDisplay.css';
import React, { useContext, useState, useEffect } from 'react';
import { Session } from '@client/context/session-context';
import { AppUser } from '@client/context/user-context';
import { Token } from '@client/context/token-context';
import CloseButton from '@components/UI/CloseButton';
import { deleteToken } from '@client/lib/api';

export default function MainDisplay(props) {
  const { session } = useContext(Session);
  const { user } = useContext(AppUser);
  const { updateToken } = useContext(Token);
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
            <div className="token-name-footer px-1 py-0 m-0"
              onClick={() => { updateToken(token); }}>
              <p>{token.tokenName}</p>
            </div>
          </div>
        );
      });
      setTokens(tokenElements);
    } else {
      setTokens(null);
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
      <div className="tokens-container">
        {user.userRole === 'gm' && <CloseButton onCloseClick={() => {
          deleteToken('all', session.sessionId);
        }}
        icon={<i className="far fa-times-circle" />} />}
        {Tokens}
      </div>
    </div>
  );
}
