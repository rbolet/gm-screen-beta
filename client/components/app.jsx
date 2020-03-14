import React from 'react';
import Header from './Header';
import Menu from './views/Menu';

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
        <Menu/>
      </div>
    );
  }
}

export default App;
