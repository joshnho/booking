import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux imports
import { Provider } from 'react-redux';
import store from './store/store';

import 'antd/dist/antd.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
