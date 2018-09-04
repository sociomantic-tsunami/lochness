/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
