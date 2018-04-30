import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

import Preview               from './Preview';


export default class LivePreview extends Component
{
    static PropTypes =
    {
        previewNode : PropTypes.node
    };

    render()
    {
        const { previewNode = [] } = this.props;

        return <Preview
            component = { previewNode }
            style={{minHeight: '100vh', overflow: 'auto'}} />;
    }
}
