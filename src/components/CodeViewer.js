import React, { Component }     from 'react';
import PropTypes                from 'prop-types';

import { html as beautifyHtml } from 'js-beautify';
import CopyToClipboard          from 'react-copy-to-clipboard';
import { Button, CodeEditor }   from 'nessie';

export default class CodeViewer extends Component
{
    static propTypes =
    {
        code : PropTypes.string
    };

    static defaultProps =
    {
        code : ''
    };

    parseCode( code )
    {
        let _code = code;
        _code = _code.replace( /data-react[^"]+"[^"]+"/g, '' );
        _code = beautifyHtml( _code, { indent_size: 4, unformatted: [] } );

        return _code;
    }

    render()
    {
        const { code } = this.props;

        return (
            <div className = "configuratorTable">

                <CodeEditor
                    value       = { this.parseCode( code ) }
                    isReadOnly />
                <CopyToClipboard
                    text = { this.parseCode( code ) }
                    onCopy = { () => this.setState( { copied: true } ) }>
                    <Button iconType = "duplicate">Copy to clipboard</Button>
                </CopyToClipboard>
            </div>
        );
    }
}
