import React, { useState } from 'react';
import Body from '../UI/Body';
// import ContainerCard from '../UI/ContainerCard';

function Menu(props) {
  const [CurrentMenu] = useState(null);

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
