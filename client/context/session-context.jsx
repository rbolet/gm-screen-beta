import React from 'react';

export const Session = React.createContext(null);

export function SessionContext(props) {
  const [sessionId, setSessionId] = React.useState(null);
  const [environmentImageFileName, setEnvironmentImageFileName] = React.useState(null);
  const [tokens, setTokens] = React.useState(null);
  const [room, setRoom] = React.useState(null);
  const [roomUserList, setRoomUserList] = React.useState([]);

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
