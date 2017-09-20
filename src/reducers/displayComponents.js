import * as DisplayComponents from 'displayComponentsDist';
import defaults               from 'displayComponentsDefaults';
import { jsxToReactNode }     from 'helpers/jsxHelpers';

const initialState = {};

Object.keys( DisplayComponents ).map( ( componentName ) =>
{
    const parsedDefaults      = { ...defaults };
    const componentDefaults =
        defaults[ componentName ] ? defaults[ componentName ] : {};

    if ( parsedDefaults[ componentName ] )
    {
        Object.keys( componentDefaults ).map( ( defaultProp ) =>
        {
            const defaultValue = componentDefaults[ defaultProp ];

            if ( typeof defaultValue === 'string' &&
                defaultValue.match( /^\s*{[^]*}\s*$/ ) )
            {
                const jsxStr =
                    defaultValue.substring( 1, defaultValue.length - 1 );

                parsedDefaults[ componentName ][ defaultProp ] =
                                                jsxToReactNode( jsxStr );
            }
        } );
    }


    initialState[ componentName ] =
        { props: parsedDefaults[ componentName ], isCollapsed: true };
} );

export default function components( state = initialState, action )
{
    switch ( action.type )
    {
    case 'UPDATE_PROPS':
        {
            const component = action.payload.component;
            const newProps  = action.payload.newProps;

            if ( typeof newProps === 'object' )
            {
                const oldProps = state[ component ].props;

                const newState = { ...state };
                newState[ component ].props = { ...oldProps, ...newProps };

                return newState;
            }

            return state;
        }

    case 'TOGGLE_COLLAPSE':
        {
            const component   = action.payload.component;
            const isCollapsed = action.payload.isCollapsed;

            if ( typeof isCollapsed === 'boolean' )
            {
                const newState = { ...state };
                newState[ component ].isCollapsed = isCollapsed;

                return newState;
            }

            return state;
        }

    case 'SWITCH_TAB':
        {
            const component      = action.payload.component;
            const activeTabIndex = action.payload.activeTabIndex;

            if ( typeof activeTabIndex === 'number' )
            {
                const newState = { ...state };
                newState[ component ].activeTabIndex = activeTabIndex;

                return newState;
            }

            return state;
        }

    case 'UPDATE_FILTER':
        {
            const newString  = action.payload.newString;

            if ( typeof newString === 'string' )
            {
                return { ...state, filterString: newString };
            }

            return state;
        }

    default:
        return state;
    }
}
