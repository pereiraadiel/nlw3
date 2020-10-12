import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/app" exact component={OrphanagesMap}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;