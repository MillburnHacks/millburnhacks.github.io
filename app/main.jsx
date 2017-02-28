import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import firebase from 'firebase';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Club from './components/Club.jsx';
import Event from './components/Event.jsx';

firebase.initializeApp({
  authDomain: 'millburnhacks.firebaseio.com',
  databaseURL: 'https://millburnhacks.firebaseio.com',
});

// set up routing
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/club/:clubID" component={Club} />
      <Route path="/event/:eventID" component={Event} />
    </Route>
  </Router>
), document.getElementById('container'));

browserHistory.listen(() => window.scrollTo(0, 0));
