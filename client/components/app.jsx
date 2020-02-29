import React from 'react';
import useWindowDimensions from './logic/useWindowDimensions';
import Header from './UI/Header';

function App(props) {
  const { height, width } = useWindowDimensions();

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      <Header/>
      <div className="app-body" style={{ height: `${height - 56}px`, width }}>
        width: {width} ~ height: {height}
      </div>

    </div>
  );
}

export default App;
