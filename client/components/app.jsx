import React from 'react';
import useWindowDimensions from './logic/useWindowDimensions';

function App(props) {
  const { height, width } = useWindowDimensions();

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      width: {width} ~ height: {height}
    </div>
  );
}

export default App;
