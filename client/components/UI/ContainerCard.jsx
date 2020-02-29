import React from 'react';
import Card from 'react-bootstrap/Card';
import useWindowDimensions from '../logic/useWindowDimensions';

function ContainerCard(props) {
  const { height, width } = useWindowDimensions;
  const cardHeight = (height * props.percentHeight);
  const cardWidth = (width * props.percentWidth);

  return (
    <Card className="ContainerCard bg-secondary" style={{ height: cardHeight, width: cardWidth }}>
      {props.header && <Card.Header>{props.header}</Card.Header>}
      {props.body && <Card.Body>{props.body}</Card.Body>}
      {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
    </Card>
  );
}

export default ContainerCard;
