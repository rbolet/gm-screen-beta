import React from 'react';
import ReactDOM from 'react-dom';
import App from '@components/App';
import ConfigContext from '@client/context/config-context';

ReactDOM.render(
  <ConfigContext>
    <App/>
  </ConfigContext>
  , document.getElementById('root'));
