import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Start from './components/pages/Start';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Start} />
      <Route exact path='/home' component={Home} />
    </Switch>
  );
}

export default App;
