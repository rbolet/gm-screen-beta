import './MainDisplay.css';
import React, { useContext, useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Session } from '@client/context/session-context';
import { AppUser } from '@client/context/user-context';
import { Token } from '@client/context/token-context';
import CloseButton from '@components/UI/CloseButton';
import { deleteToken } from '@client/lib/api';

export default function MainDisplay(props) {
  const { session } = useContext(Session);
  const [environmentFilePath, setEnvironmentFilePath] = useState(null);

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
      <TokenDisplay/>
    </div>
  );
}

function TokenDisplay() {
  const { session } = useContext(Session);
  const { user } = useContext(AppUser);
  const { updateToken } = useContext(Token);
  const [displayedTokens, setDisplayedTokens] = useState(session.tokens);
  const [TokenElements, setTokenElements] = useState([]);

  useEffect(() => {
    setDisplayedTokens([...displayedTokens, ...session.tokens, ...session.hiddenTokens]);
  }
  , [session.tokens, session.hiddenTokens]);

  useEffect(() => {
    if (displayedTokens.length) {
      setTokenElements(session.tokens.map(token => {
        return (
          <div
            key={token.tokenId}
            style={{ backgroundImage: `url(./images/${token.imageFileName})` }}
            className="token mx-2 position-relative">
            {token.hidden && <div className="hidden-badge">
              <Badge variant="info"><i className="far fa-eye-slash" /></Badge>
            </div>}
            <div className="token-name-footer px-1 py-0 m-0"
              onClick={() => { updateToken(token); }}>
              <p>{token.tokenName}</p>
            </div>
          </div>
        );
      }));
    } else {
      setTokenElements([]);
    }
  }, [displayedTokens]);

  return (
    <div className="tokens-container">
      {user.userRole === 'gm' && <CloseButton onCloseClick={() => {
        deleteToken('all', session.sessionId);
      }}
      icon={<i className="far fa-times-circle" />} />}
      {TokenElements}
    </div>
  );
}
