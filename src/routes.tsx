import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/app" component={OrphanagesMap}/>
        <Route path="/orphanages/create" component={CreateOrphanage}/>
        <Route path="/orphanages/:id" component={Orphanage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;