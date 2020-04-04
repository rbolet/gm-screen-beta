import React from 'react';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import MainDisplay from '@components/MainDisplay';

export default function PlayerView() {

  return (
    <Body>
      <ContainerCard percentHeight={100} percentWidth={100} bg="#343a40" shadow={true}>
        <MainDisplay/>
      </ContainerCard>
    </Body>
  );
}
