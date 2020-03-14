import React from 'react';
import Header from './Header';
// import Menu from './views/Menu';
import GMView from './views/GMView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'menu'
    };
  }

  render() {
    return (
      <div>
        <Header/>
        <GMView/>
      </div>
    );
  }
}

export default App;
