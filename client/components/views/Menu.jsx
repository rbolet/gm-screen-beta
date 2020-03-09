import React from 'react';
import useWindowDimensions from './logic/useWindowDimensions';

function Menu(props) {
  const { bodyHeight, width } = useWindowDimensions();
  return (
    <div className="app-body container-fluid py-3" style={{ height: bodyHeight, width }}>

    </div>
  );
}

export default Menu;
