import './CloseButton.css';
import React from 'react';

export default function CloseButton(props) {
  return (
    <div className='close-button' onClick={props.onCloseClick}>
      {props.icon}
    </div>
  );
}
