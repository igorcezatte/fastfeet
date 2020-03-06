import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliverymen from '../pages/Deliverymen';
import Recipients from '../pages/Recipients';
import Deliveries from '../pages/Deliveries';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} />
      <Route path="/deliveries" component={Deliveries} />
      <Route path="/problems" component={Problems} />
    </Switch>
  );
}
