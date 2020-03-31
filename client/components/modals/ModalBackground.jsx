import './ModalBackground.css';
import React from 'react';
import useWindowDimensions from '@components/logic/useWindowDimensions';

export default function ModalBackground(props) {
  const [width, height] = useWindowDimensions();
  return (
    <div className="modal-background" style={{ width, height }}>
      {props.children}
    </div>
  );
}
