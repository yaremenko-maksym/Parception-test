import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';

import { App } from './App';
import { store } from './store';

render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
