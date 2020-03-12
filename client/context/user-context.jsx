import React from 'react';

export const AppUser = React.createContext(null);

export function UserContext(props) {
  const [userId, setUserId] = React.useState(null);
  const [userName, setUserName] = React.useState('Fred');
  const [userRole, setUserRole] = React.useState('mm');

  const updateUser = userObject => {
    Object.keys(userObject).forEach(key => {
      switch (key) {
        case 'userId':
          setUserId(userObject.userId); break;
        case 'userName':
          setUserName(userObject.userName); break;
        case 'userRole':
          setUserRole(userObject.userRole); break;
      }
    });
  };

  const user = { userId, userName, userRole };
  return (
    <AppUser.Provider value={{ user, updateUser }}>{props.children}</AppUser.Provider>
  );
}
