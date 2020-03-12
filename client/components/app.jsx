import React, { useState } from 'react';
import useWindowDimensions from './logic/useWindowDimensions';
import Header from './UI/Header';
import Menu from './views/Menu';

function App() {
  const { height, width } = useWindowDimensions();
  const [CurrentView] = useState(<Menu/>);

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      <Header/>
      {CurrentView}
    </div>
  );
}

export default App;
