import React from 'react';
import Image from 'react-bootstrap/Image';
import ContainerCard from '@components/UI/ContainerCard';

export default function FeaturedImage(props) {
  const image = props.image;
  return (
    <ContainerCard percentHeight={100} percentWidth={100}>
      <Image src={`./images/${image.fileName}`} thumbnail/>
    </ContainerCard>
  );
}
