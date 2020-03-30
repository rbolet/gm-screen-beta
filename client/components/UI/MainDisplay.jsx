import './MainDisplay.css';
import React, { useContext, useState, useEffect } from 'react';
import { Session } from '@client/context/session-context';
import Loading from '@components/UI/Loading';

export default function MainDisplay() {
  const { session } = useContext(Session);
  const [Tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(session.loading);
  }, [session.Loading]);

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

  if (loading) {
    return <Loading/>;
  } else {
    return (
      <div className="environment-image"
        style={{ backgroundImage: `url(./images/${session.environmentImageFileName})` }}>
        <div className="tokens-container">
          {Tokens}
        </div>
      </div>
    );
  }
}
