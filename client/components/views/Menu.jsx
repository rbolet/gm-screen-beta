import React, { useState } from 'react';
import Body from '../UI/Body';
import ContainerCard from '../UI/ContainerCard';
import { useUser } from '../logic/useConfig';

function Menu(props) {
  const [clicked, setClicked] = useState(false);

  const user = useUser({ userName: clicked });
  return (
    <Body>
      <ContainerCard bg="#343a40">
        <button onClick={() => { setClicked(!clicked); }}>
          {`${user.userName}`}
        </button>
      </ContainerCard>
    </Body>
  );
}

export default Menu;
