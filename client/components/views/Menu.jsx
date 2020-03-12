import React, { useContext } from 'react';
import Body from '../UI/Body';
import ContainerCard from '../UI/ContainerCard';
import { AppUser } from '../../context/user-context';

function Menu(props) {
  const { updateUser } = useContext(AppUser);

  return (
    <Body>
      <ContainerCard bg="#343a40">
        <button onClick={() => { updateUser({ userName: 'Fred' }); }}>
          Fred
        </button>
      </ContainerCard>
    </Body>
  );
}

export default Menu;
