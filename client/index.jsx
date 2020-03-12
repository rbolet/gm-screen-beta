import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { UserContext } from './context/user-context';

ReactDOM.render(
  <UserContext>
    <App/>
  </UserContext>
  , document.getElementById('root'));
