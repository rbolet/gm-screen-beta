import React from 'react';
import Body from '../UI/Body';
import Login from '../UI/Login';

function Menu(props) {
  const CurrentMenu = <Login/>;

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
