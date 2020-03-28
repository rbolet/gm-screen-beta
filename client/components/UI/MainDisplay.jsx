import './MainDisplay.css';
import React, { useContext, useEffect } from 'react';
import { Session } from '@client/context/session-context';

export default function MainDisplay() {
  const { session } = useContext(Session);
  let Tokens = null;

  useEffect(() => {
    if (session.tokens) {
      Tokens = session.tokens.map(token => {
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
    }
  }, [session.tokens]);

  return (
    <Environment backgroundImage={session.environmentImageFileName}>
      <div className="tokens-container">
        {Tokens}
      </div>
    </Environment>
  );
}

function Environment(props) {
  return (
    <div className="environment-image"
      style={{ backgroundImage: `url(./images/${props.backgroundImage})` }} />
  );
}
