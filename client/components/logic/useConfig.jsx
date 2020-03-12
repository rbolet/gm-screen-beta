import React, { useState, useEffect } from 'react';

export function useUser(userProps) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Fred');
  const [userRole, setUserRole] = useState('mm');

  useEffect(() => {
    if (userProps) {
      Object.keys(userProps).forEach(key => {
        switch (key) {
          case 'userId':
            setUserId(userProps.userId); break;
          case 'userName':
            setUserName(userProps.userName); break;
          case 'userRole':
            setUserRole(userProps.userRole); break;
        }
      });
    }
  }, [userProps]);

  return { userId, userName, userRole };

}

const AppUser = React.createContext(null);

export function UserContext(props) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Fred');
  const [userRole, setUserRole] = useState('mm');

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
