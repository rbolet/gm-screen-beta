import React from 'react';
import useWindowDimensions from '../logic/useWindowDimensions';

export default function Body(props) {
  const { bodyHeight, width } = useWindowDimensions();

  return (
    <div className="Body bg-secondary p-2" style={{ height: bodyHeight, width }}>
      {props.children}
    </div>
  );
}
