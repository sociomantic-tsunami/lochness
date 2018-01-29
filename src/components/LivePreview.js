import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

import { Page, PageContent } from 'nessie-ui';

export default class LivePreview extends Component
{
    static PropTypes =
    {
        previewNode : PropTypes.node
    };

    render()
    {
        const { previewNode = [] } = this.props;

        return <PageContent>{ previewNode }</PageContent>;
    }
}
