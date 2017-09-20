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
