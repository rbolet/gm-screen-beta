import '../../css/ContainerCard.css';
import React from 'react';
import Card from 'react-bootstrap/Card';

function ContainerCard(props) {
  const height = props.percentHeight ? `${props.percentHeight}%` : 'auto';
  const width = props.percentWidth ? `${props.percentWidth}%` : 'auto';
  const bg = props.bg ? props.bg : 'transparent';

  return (
    <Card className="ContainerCard d-flex" style={{ height, width, backgroundColor: bg }}>
      {props.header && <div className="container-card-header">{props.header}</div>}
      {props.children && <div className="container-card-body">{props.children}</div>}
      {props.footer && <div className="container-card-footer">{props.footer}</div>}
    </Card>
  );
}

export default ContainerCard;
