import { useState, useEffect } from 'react';

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
