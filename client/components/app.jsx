import React from 'react';
import Header from './Header';
import Menu from './views/Menu';
import GMView from './views/GMView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'menu'
    };
  }

  render() {
    let CurrentView;
    switch (this.state.currentView) {
      case 'menu': CurrentView = <Menu/>; break;
      case 'gm': CurrentView = <GMView/>; break;
    }

    return (
      <div>
        <Header/>
        {CurrentView}
      </div>
    );
  }
}

export default App;
