import './ContainerCard.css';
import React from 'react';

function ContainerCard(props) {
  const height = props.percentHeight ? `${props.percentHeight}%` : 'auto';
  const width = props.percentWidth ? `${props.percentWidth}%` : 'auto';
  const bg = props.bg ? props.bg : 'transparent';
  const color = props.color ? props.color : 'inherit';
  const shadow = props.shadow ? 'custom-shadow ' : '';

  return (
    <div className={`container-card ${shadow}${props.className}`} style={{ height, width, backgroundColor: bg, color }}>
      {props.header && <div className="container-card-header">{props.header}</div>}
      {props.children && <div className={`container-card-body ${props.className}`}>{props.children}</div>}
      {props.footer && <div className="container-card-footer">{props.footer}</div>}
    </div>
  );
}

export default ContainerCard;
