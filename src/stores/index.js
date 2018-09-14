/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { createStore, applyMiddleware, compose } from 'redux';
import reducers                                  from '../reducers';
import debounceMiddleware                        from '../middlewares/debounceMiddleware';

module.exports = function( initialState )
{
    const store = createStore( reducers, initialState,
      compose(
        applyMiddleware( debounceMiddleware ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if ( module.hot )
{
    // Enable Webpack hot module replacement for reducers
        module.hot.accept( '../reducers', () =>
{
            const nextReducer = require( '../reducers' );
            store.replaceReducer( nextReducer );
        } );
    }

    return store;
};
