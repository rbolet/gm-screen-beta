import './App.css';
import React from 'react';
import Header from './Header';
import Menu from './views/Menu';
// import GMView from './views/GMView';

function App() {
  const [CurrentView] = React.useState(<Menu/>);

  return (
    <div>
      <Header/>
      {CurrentView}
    </div>
  );
}

export default App;
