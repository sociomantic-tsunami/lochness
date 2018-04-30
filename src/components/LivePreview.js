import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

export default class LivePreview extends Component
{
    static PropTypes =
    {
        previewNode : PropTypes.node
    };

    render()
    {
        const { previewNode = [] } = this.props;

        return <div>{ previewNode }</div>;
    }
}
