import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.scss';

import ColorView from './ColorView';
import NavBar from './Navbar';

export default () => (
  <>
    <NavBar />
    <Switch>
      <Route exact strict path="/" component={ColorView} />
    </Switch>
  </>
);
