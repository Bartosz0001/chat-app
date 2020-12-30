import React, { useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Start from './components/pages/Start';
import { userContext } from './context/user';

const App = () => {
  const [userName, setUserName] = useState('');
  const providerValue = useMemo(() => ({userName, setUserName}), [userName, setUserName]);
  return (
    <Switch>
      <userContext.Provider value={providerValue}>
        <Route exact path='/' component={Start} />
        <Route exact path='/home' component={Home} />
      </userContext.Provider>
    </Switch>
  );
}

export default App;
