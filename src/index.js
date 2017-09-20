import React                    from 'react';
import { render }               from 'react-dom';
import { Provider }             from 'react-redux';
import configureStore           from './stores';
import { Router, hashHistory }  from 'react-router';
import AllRoutes                from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import 'normalize.css';
import nessieCss                from 'nessie/dist/styles.css';
// import displayComponentStyles   from 'displayComponentStyles';

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
