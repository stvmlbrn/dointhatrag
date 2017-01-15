import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './layouts/layout';
import Index from './containers/index';

render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Index}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('app')
);
