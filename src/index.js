/* global document */

import React                    from 'react';
import { render }               from 'react-dom';
import { Provider }             from 'react-redux';
import { Router, hashHistory }  from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore           from './stores';
import AllRoutes                from './routes';

import 'normalize.css';
import 'nessie-ui/dist/styles.css';
import './styles.css';

const store = configureStore();
const history = syncHistoryWithStore( hashHistory, store );

render(
    <Provider store = { store }>
        <Router history = { history } >
            {AllRoutes}
        </Router>
    </Provider>,
  document.getElementById( 'app' )
);
