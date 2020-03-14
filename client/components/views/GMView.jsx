import React from 'react';
import Body from '../UI/Body';
import ContainerCard from '../UI/ContainerCard';
import ImageGrid from '../UI/ImageGrid';

function GMView(props) {
  return (
    <Body>
      <ContainerCard percentHeight={100} percentWidth={66} bg="#343a40" shadow={true}/>
      <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}>
        <ImageGrid/>
      </ContainerCard>
    </Body>
  );
}

export default GMView;
