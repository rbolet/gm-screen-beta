import React, { useState } from 'react';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';

function GMView(props) {
  const [setSelectedImage] = useState(null);
  return (
    <Body>
      <ContainerCard percentHeight={100} percentWidth={66} bg="#343a40" shadow={true}/>
      <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
    </Body>
  );
}

export default GMView;
