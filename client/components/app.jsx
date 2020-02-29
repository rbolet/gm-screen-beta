import React from 'react';
import useWindowDimensions from './logic/useWindowDimensions';
import Header from './UI/Header';
import ContainerCard from './UI/ContainerCard';

function App(props) {
  const { height, width, bodyHeight } = useWindowDimensions();

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      <Header/>
      <div className="app-body container-fluid py-3" style={{ height: bodyHeight, width }}>
        <ContainerCard percentHeight={100} percentWidth={50}/>
      </div>

    </div>
  );
}

export default App;
