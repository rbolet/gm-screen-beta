import React from 'react';
import Body from '../UI/Body';
import ContainerCard from '../UI/ContainerCard';

function GMView(props) {
  return (
    <Body>
      <ContainerCard percentHeight={100} percentWidth={100} >
        <ContainerCard className="mr-3" percentHeight={100} percentWidth={66} bg="#343a40"/>
        <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"/>

      </ContainerCard>
    </Body>
  );
}

export default GMView;
