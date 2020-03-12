import React from 'react';
import useWindowDimensions from '../logic/useWindowDimensions';

export default function Body(props) {
  const { bodyHeight, width } = useWindowDimensions();

  return (
    <div className="app-body p-3" style={{ height: bodyHeight, width }}>
      {props.children}
    </div>
  );
}
