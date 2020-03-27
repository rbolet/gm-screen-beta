import './FeaturedImage.css';
import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ContainerCard from '@components/UI/ContainerCard';

export default function FeaturedImage(props) {
  let Featured = null;

  if (props.image) {
    Featured = <Image src={`./images/${props.image.fileName}`} thumbnail />;
  } else {
    Featured = (
      <div className="img-thumbnail mh-100 text-muted text-center d-block">
        Select an image from the grid
      </div>
    );
  }

  return (
    <ContainerCard percentHeight={100} percentWidth={100}>
      <Card className="featured-container w-100 h-100">
        <Card.Body className="w-100 h-100 d-flex align-items-center justify-content-center"
          footer={<div style={{ height: '40px' }}>{props.image && props.image.alias}</div>}>
          {Featured}
        </Card.Body>
        {/* {props.image && <Card.Footer className="d-flex justify-content-center">{props.image && props.image.alias}</Card.Footer>} */}
      </Card>
    </ContainerCard>
  );
}
