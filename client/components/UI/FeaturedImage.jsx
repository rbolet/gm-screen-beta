import './FeaturedImage.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ContainerCard from '@components/UI/ContainerCard';

export default function FeaturedImage(props) {
  let Featured = null;

  if (props.image) {
    Featured = <div className='h-100 w-100' style={{ backgroundImage: `url(./images/${props.image.fileName})` }}/>;
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
        <Card.Body className="w-100 d-flex align-items-center justify-content-center">
          {Featured}
        </Card.Body>
      </Card>
    </ContainerCard>
  );
}
