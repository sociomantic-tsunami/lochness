import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

import { Page, PageContent } from 'nessie';

export default class LivePreview extends Component
{
    static PropTypes =
    {
        previewNode : PropTypes.node
    };

    render()
    {
        const { previewNode = [] } = this.props;

        return (
            <Page>
                <PageContent>
                    { previewNode }
                </PageContent>
            </Page>
        );
    }
}
