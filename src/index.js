/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
