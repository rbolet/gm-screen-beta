import React from 'react';
import Body from '../UI/Body';
import Login from '../UI/Login';
import { AppUser } from '../../context/user-context';

function Menu(props) {
  const { user } = React.useContext(AppUser);
  let CurrentMenu;
  if (!user.userId) {
    CurrentMenu = <Login/>;
  }

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
