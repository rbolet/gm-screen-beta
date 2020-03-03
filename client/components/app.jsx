import React from 'react';
import useWindowDimensions from './logic/useWindowDimensions';
import Header from './UI/Header';

function App() {
  const { height, width } = useWindowDimensions();

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      <Header/>

    </div>
  );
}

export default App;
