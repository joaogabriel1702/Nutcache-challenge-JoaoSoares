import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Employee from './pages/Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Employee} />
    </Switch>
  );
}

export default Routes;