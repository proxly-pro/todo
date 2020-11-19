// Core
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import HomePage from '@components/pages/HomePage';

import { book } from '@routes/book';

const App = () => (
  <Switch>
    <Route path={book.home} component={HomePage} exact />
  </Switch>
);

// Exports
export default App;
