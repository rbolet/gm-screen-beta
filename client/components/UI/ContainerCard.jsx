import React from 'react';
import Card from 'react-bootstrap/Card';

function ContainerCard(props) {
  const height = `${props.percentHeight}%`;
  const width = `${props.percentWidth}%`;

  return (
    <Card className="ContainerCard bg-success" style={{ height, width }}>
      {props.header && <Card.Header>{props.header}</Card.Header>}
      {props.body && <Card.Body>{props.body}</Card.Body>}
      {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
    </Card>
  );
}

export default ContainerCard;
