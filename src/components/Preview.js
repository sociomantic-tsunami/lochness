import React, { Component }              from 'react';
import ReactDOMServer                    from 'react-dom/server';
import sprite                            from 'displayComponents/dist/sprite.html';


export default class Preview extends Component
{
    getSrcDoc( component )
    {
        if ( Array.isArray( component ) )
        {
            let template = '';

            component.map( comp =>
            {
                template += `<html style="height: auto"><head><link rel="stylesheet" href = 'displayComponentStyles.css' /></head><body style="padding: 8rem;box-sizing: border-box;height: auto;width: 140rem;margin: 0 auto">  ${ReactDOMServer.renderToString( comp )} ${sprite} </body></html>`;
            } );
            return template;
        }
        return `<html><head><link rel="stylesheet" href = 'displayComponentStyles.css' /></head><body>  ${ReactDOMServer.renderToString( component )} ${sprite} </body></html>`;
    }

    render()
    {
        const { component, width, height, style } = this.props;

        return (
            <iframe
                srcDoc = { this.getSrcDoc( component ) }
                frameBorder = { 0 }
                style = { style }/>
        );
    }
}
