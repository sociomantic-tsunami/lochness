/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * Allows `debounce` of any action using meta value
 * { meta : { debounce : 50 } }
 */

const pendingActions = {};

const debounceMiddleware = () => next => action =>
{
    const { debounce } = action.meta || {};

    if ( !debounce )
    {
        return next( action );
    }

    if ( pendingActions[ action.type ] )
    {
        clearTimeout( pendingActions[ action.type ] );
    }

    pendingActions[ action.type ] = setTimeout( () =>
    {
        delete pendingActions[ action.type ];
        next( action );
    }, debounce );
};

export default debounceMiddleware;
