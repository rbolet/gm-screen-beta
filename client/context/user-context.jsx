import React from 'react';

export const AppUser = React.createContext(null);

export function UserContext(props) {
  const [userId, setUserId] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const [socketId, setSocketId] = React.useState(null);

  const updateUser = userObject => {
    Object.keys(userObject).forEach(key => {
      switch (key) {
        case 'userId':
          setUserId(userObject.userId); break;
        case 'userName':
          setUserName(userObject.userName); break;
        case 'userRole':
          setUserRole(userObject.userRole); break;
        case 'socketId':
          setSocketId(userObject.socketId); break;
      }
    });
  };

  const user = { userId, userName, userRole, socketId };
  return (
    <AppUser.Provider value={{ user, updateUser }}>{props.children}</AppUser.Provider>
  );
}
