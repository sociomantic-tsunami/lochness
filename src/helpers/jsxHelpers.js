/* global Babel */

import * as React     from  'react';
import * as DisplayComponents    from 'displayComponentsDist';

import { unwrapNode } from './reactNodeHelpers';

const babelOptions = { 'presets': [ 'react' ] };


/**
 * Replaces <Component/> with <DisplayComponents.Component/> if
 * <Component> is a valid DisplayComponents component; otherwise
 * replace with <component/> (note lowercase)
 * @param  {String} jsxStr - a string containing JSX
 * @return {String}
 */
export const cleanseJsx = ( jsxStr = '' ) =>
{
    const regex = /(<\/?)([A-Z]\w*)/g;

    const cleanse = ( match, g1, g2 ) =>
DisplayComponents[ g2 ] ? `${g1}DisplayComponents.${g2}`
                        : g1 + g2.toLowerCase();

    return jsxStr.replace( regex, cleanse );
};


/**
 * Wraps a string of JSX in an outer <div>
 * @param  {String} jsxStr - a string containing JSX
 * @return {String}
 */
export const wrapJsx = ( jsxStr = '' ) =>
`<div>${jsxStr}</div>`;


export const jsxToReactNode = ( jsxStr = '' ) =>
{
    const wrappedJsx = wrapJsx( cleanseJsx( jsxStr ) );

    let wrappedNode = [];

	  try
    {
      wrappedNode = eval( Babel.transform( wrappedJsx, babelOptions ).code );
  }
    catch ( err )
    {
      console.error( 'JSX parse error:', err );
  }

    return unwrapNode( wrappedNode );
};
