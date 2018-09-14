/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import * as DisplayComponents from 'displayComponents';
import defaults               from 'displayComponentsDefaults';
import { jsxToReactNode }     from 'helpers/jsxHelpers';

const initialState = { components: {} };

Object.keys( DisplayComponents ).map( ( componentName ) =>
{
    const parsedDefaults    = { ...defaults };
    const componentDefaults =
        defaults[ componentName ] ? defaults[ componentName ] : {};

    if ( parsedDefaults[ componentName ] )
    {
        Object.keys( componentDefaults ).forEach( ( defaultProp ) =>
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


    initialState.components[ componentName ] =
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
                const oldProps = state.components[ component ].props;

                const newComponents = { ...state.components };
                const newState = { ...state, components: newComponents };

                newState.components[ component ].props =
                    { ...oldProps, ...newProps };

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
                const newComponents = { ...state.components };
                const newState = { ...state, components: newComponents };

                newState.components[ component ].isCollapsed = isCollapsed;

                return newState;
            }

            return state;
        }

    case 'TOGGLE_COLLAPSE_DESC':
        {
            const component       = action.payload.component;
            const descIsCollapsed = action.payload.descIsCollapsed;

            if ( typeof descIsCollapsed === 'boolean' )
            {
                const newComponents = { ...state.components };
                const newState = { ...state, components: newComponents };

                newState.components[ component ].descIsCollapsed =
                    descIsCollapsed;

                return newState;
            }

            return state;
        }

    case 'TOGGLE_COLLAPSE_SPECS':
        {
            const component        = action.payload.component;
            const specsIsCollapsed = action.payload.specsIsCollapsed;

            if ( typeof specsIsCollapsed === 'boolean' )
            {
                const newComponents = { ...state.components };
                const newState = { ...state, components: newComponents };

                newState.components[ component ].specsIsCollapsed =
                    specsIsCollapsed;

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
                const newComponents = { ...state.components };
                const newState = { ...state, components: newComponents };

                newState.components[ component ].activeTabIndex =
                    activeTabIndex;

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
