/* global document */

import React, { Component } from 'react';
import svgSprite            from 'nessie-ui/dist/sprite.html';
// import {
//     name as displayComponentsName,
//     version as displayComponentsVersion,
// } from 'displayComponents/package.json';
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
                        {/* <Text>
                            {displayComponentsName} {displayComponentsVersion}
                        </Text> */}
                    </Column>
                </Row>
            </PageHeader>
        );
    }
}
