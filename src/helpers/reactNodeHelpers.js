import ReactDOMServer           from 'react';
import { html as beautifyHtml } from 'js-beautify';

const beautifySettings = { indent_size: 4, unformatted: [] };


/**
 * Try to beautify a HTML or JSX string using js-beautify;
 * return original string if unsuccessful
 * @param  {String} str - a string containing HTML or JSX
 * @return {String}
 */
const beautifyCode = ( str ) =>
{
    let beautifulStr = str;

    try
	{
        beautifulStr = beautifyHtml( str, beautifySettings );
    }
    catch ( err )
	{
        console.error( 'Beautify error:', err.message );
    }

    return beautifulStr;
};


/**
 * Extends ReactDOMServer.renderToString() to render any sort of
 * ReactNode (not just ReactElements) or fall back to JSON.stringify()
 * @param  {Object|Array|String} node - a ReactNode
 * @return {String}
 */
const generateHtml = ( node ) =>
{
    if ( isReactElement( node ) )
    {
        return ReactDOMServer.renderToString( node );
    }
    else if ( isReactFragment( node ) )
    {
    	let htmlStr = '';

        node.map( ( child ) =>
        {
            htmlStr += generateHtml( child );
        } );

        return htmlStr;
    }
    else if ( isReactText( node ) )
    {
        return String( node );
    }
    else if ( isReactEmpty( node ) )
    {
        return '';
    }

    	try
    	{
    		return JSON.stringify( node );
    	}
    	catch ( err )
    	{
    		console.error( 'stringify error:', err.message );
    		return node;
    	}
};


/**
 * Builds a JSX string representation of a ReactNode
 * or fall back to JSON.stringify()
 * @param  {Object|Array|String} node - a ReactNode
 * @return {String}
 */
const generateJsx = ( node ) =>
{
    if ( isReactElement( node ) )
	{
        const type = node.type;

        const name  = type.name  ? type.name  : type;
        const props = node.props ? node.props : {};

        const children = props.children;

        const jsxStr = `<${name}${propsToString( props, type.defaultProps )}`;

        if ( children )
		{
            return `${jsxStr}>${generateJsx( children )}</${name}>`;
        }

        return `${jsxStr}/>`;
    }
    else if ( isReactFragment( node ) )
	{
        let jsxStr = '';

        node.map( ( child ) =>
		{
            jsxStr += generateJsx( child );
        } );

        return jsxStr;
    }
    else if ( isReactText( node ) )
	{
        return String( node );
    }
    else if ( isReactEmpty( node ) )
	{
        return '';
    }

    try
    	{
    		return JSON.stringify( node );
    	}
    	catch ( err )
    	{
    		console.error( 'stringify error:', err.message );
    		return node;
    	}
};


/**
 * Tests if node is a ReactElement (more lenient than React.isValidElement)
 * Ref: https://facebook.github.io/react/docs/glossary.html#formal-type-definitions
 * @param  {Object|Array|String} node - a ReactNode
 * @return {Boolean}
 */
const isReactElement = ( node ) =>
typeof node === 'object' && node.type;


/**
 * Tests if node is ReactEmpty
 * Ref: https://facebook.github.io/react/docs/glossary.html#formal-type-definitions
 * @param  {Object|Array|String} node - a ReactNode
 * @return {Boolean}
 */
const isReactEmpty = ( node ) =>
node === null || node === undefined || typeof node === 'boolean';


/**
 * Tests if node is a ReactFragment
 * Ref: https://facebook.github.io/react/docs/glossary.html#formal-type-definitions
 * @param  {Object|Array|String} node - a ReactNode
 * @return {Boolean}
 */
const isReactFragment = ( node ) =>
Array.isArray( node );


/**
 * Tests if node is ReactText
 * Ref: https://facebook.github.io/react/docs/glossary.html#formal-type-definitions
 * @param  {Object|Array|String} node - a ReactNode
 * @return {Boolean}
 */
const isReactText = ( node ) =>
typeof node === 'string' || typeof node === 'number';


/**
 * Extends ReactDOMServer.renderToString() to render any sort of
 * ReactNode with optional code beautification
 * @param  {Object|Array|String} node - a ReactNode
 * @param  {Boolean} [beautify=true]
 * @return {String}
 */
export const nodeToHtml = ( node, beautify = true ) =>
{
    const htmlStr = generateHtml( node );
    return beautify ? beautifyCode( htmlStr ) : htmlStr;
};


/**
 * Builds a JSX string representation of a ReactNode
 * with optional code beautification
 * @param  {Object|Array|String} node - a ReactNode
 * @param  {Boolean} [beautify=true]
 * @return {String}
 */
export const nodeToJsx = ( node, beautify = true ) =>
{
    const jsxStr = generateJsx( node );
    return beautify ? beautifyCode( jsxStr ) : jsxStr;
};


/**
 * Converts an object of props to a string, excluding defaultProps
 * @param  {Object} props - an object of React props
 * @param  {Object} defaultProps - an object of defaults
 * @return {String}
 */
const propsToString = ( props = {}, defaultProps = {} ) =>
{
    let propStr = '';

    Object.keys( props ).map( ( prop ) =>
	{
        const propVal = props[ prop ];

        if ( prop !== 'children' && propVal !== defaultProps[ prop ] )
		{
            propStr += ` ${prop}=`;

            if ( typeof propVal === 'string' )
			{
                propStr += `"${propVal}"`;
            }
            else
			{
                propStr += `{${JSON.stringify( propVal )}}`;
            }
        }
    } );

    return propStr;
};

/**
 * Returns immediate child ReactNode of a ReactElement
 * @param  {Object} element - a ReactElement
 * @return {Object|Array|String}
 */
export const unwrapNode = ( element ) =>
{
    if ( isReactElement( element ) )
    {
        return element.props.children;
    }
};
