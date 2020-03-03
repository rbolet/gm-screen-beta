import React from 'react';
import Card from 'react-bootstrap/Card';

function ContainerCard(props) {
  const height = `${props.percentHeight}%`;
  const width = `${props.percentWidth}%`;
  const bg = props.bg ? props.bg : 'transparent';

  return (
    <Card className="ContainerCard d-flex" style={{ height, width, backgroundColor: bg }}>
      {props.header && <Card.Header>{props.header}</Card.Header>}
      {props.body && <Card.Body>{props.body}</Card.Body>}
      {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
      {props.children}
    </Card>
  );
}

export default ContainerCard;
