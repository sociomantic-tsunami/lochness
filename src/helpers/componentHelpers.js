
/**
 * Loads README for component and returns HTML generated from MD
 */
export const getComponentReadme = ( componentName ) =>
{
    let html;

    try
    {
        html = require( `html-loader!markdown-loader!displayComponentsSrc/${componentName}/README.md` );
    }
    catch ( err )
    {
        console.error( 'Error reading', componentName, 'README:', err );
        return '';
    }

    return html;
};

/**
 * Loads JSON spec for component and returns object
 */
export const getComponentSpecs = ( componentName ) =>
{
    let jsonSpecs = {};

    try
    {
        jsonSpecs = require( `displayComponentProps/${componentName}-props.json` );
    }
    catch ( err )
    {
        console.error( 'Error reading', componentName, 'specs:', err );
    }

    return jsonSpecs.props ? jsonSpecs.props : undefined;
};
