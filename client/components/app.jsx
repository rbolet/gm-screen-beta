import React, { useState } from 'react';
import useWindowDimensions from './logic/useWindowDimensions';
import Header from './UI/Header';
import ContainerCard from './UI/ContainerCard';
import { useUser } from './logic/useConfig';

function App() {
  console.log(useUser({ id: 12 }));
  const { height, width, bodyHeight } = useWindowDimensions();
  const [blah, setBlah] = useState('hi');

  return (
    <div className="App bg-secondary" style={{ height, width }}>
      <Header/>
      <div className="app-body container-fluid py-3" style={{ height: bodyHeight, width }}>
        <ContainerCard percentHeight={100} percentWidth={50} bg="#007bff">
        </ContainerCard>
        {blah}
      </div>

    </div>
  );
}

export default App;
