// Core
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import HomePage from '@components/pages/HomePage';

// Navigation
import { navigation } from '@navigation/index';

const App = () => (
  <Switch>
    <Route exact path={navigation.home} component={HomePage} />
  </Switch>
);

// Exports
export default App;
