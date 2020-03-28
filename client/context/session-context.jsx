import React, { useState } from 'react';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const [sessionId, setSessionId] = useState(null);
  const [environmentImageFileName, setEnvironmentImageFileName] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [room, setRoom] = useState(null);
  const [roomUserList, setRoomUserList] = useState([]);

  const updateSession = sessionObject => {
    Object.keys(sessionObject).forEach(key => {
      switch (key) {
        case 'sessionId':
          setSessionId(sessionObject.sessionId); break;
        case 'environmentImageFileName':
          setEnvironmentImageFileName(sessionObject.environmentImageFileName); break;
        case 'tokens':
          setTokens(sessionObject.tokens); break;
        case 'room':
          setRoom(sessionObject.room); break;
        case 'roomUserList':
          setRoomUserList(sessionObject.roomUserList); break;
      }
    });
  };

  const session = { sessionId, environmentImageFileName, tokens, room, roomUserList };

  return (
    <Session.Provider value={{ session, updateSession }}>{props.children}</Session.Provider>
  );
}
