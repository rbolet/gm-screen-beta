import './FeaturedImage.css';
import React from 'react';
import Image from 'react-bootstrap/Image';
import ContainerCard from '@components/UI/ContainerCard';

export default function FeaturedImage(props) {
  let Featured;

  if (props.image) {
    Featured = (
      <Image src={`./images/${props.image.fileName}`} thumbnail />
    );
  } else {
    Featured = (
      <div className="img-thumbnail mh-100 text-muted">
        Select an image from the grid
      </div>
    );
  }

  return (
    <ContainerCard percentHeight={100} percentWidth={100}>
      <div className="featured-image-container">
        {Featured}
      </div>
    </ContainerCard>
  );
}
