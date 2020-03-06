import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Deliverymen from '../pages/Deliverymen';
import Recipients from '../pages/Recipients';
import Deliveries from '../pages/Deliveries';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliverymen" component={Deliverymen} />
      <Route path="/recipients" component={Recipients} />
      <Route path="/deliveries" component={Deliveries} />
      <Route path="/problems" component={Problems} />
    </Switch>
  );
}
