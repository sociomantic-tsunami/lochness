/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component } from 'react';
import svgSprite            from 'displayComponents/dist/sprite.html';
import {
    name as displayComponentsName,
    version as displayComponentsVersion,
} from 'displayComponents/package.json';
import {
    PageHeader,
    Row,
    Column,
    Text,
} from 'nessie-ui';

export default class LochnessHeader extends Component
{
    componentDidMount()
    {
        const svgContainer = document.createElement( 'div' );
        svgContainer.innerHTML = svgSprite;
        document.body.appendChild( svgContainer );
    }

    render()
    {
        return (
            <PageHeader>
                <Row verticalAlign = "middle">
                    <Column>
                        <div className = "lochNessLogo"/>
                    </Column>
                    <Column align = "right">
                        <Text><strong>LochNess</strong></Text>
                        <Text>
                            {displayComponentsName} {displayComponentsVersion}
                        </Text>
                    </Column>
                </Row>
            </PageHeader>
        );
    }
}
