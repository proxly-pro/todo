// Core
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// Components
import App from '@components/atoms/App';
import ErrorBoundary from '@components/atoms/ErrorBoundary';

// Store
import { store, history } from '@store/index';

// Styles
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router history={history}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
