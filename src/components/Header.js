/* global document */

import React, { Component }              from 'react';
import { PageHeader, Row, Column, Text } from 'nessie-ui';
import svgSprite                         from 'nessie-ui/dist/sprite.html';
import componentPackage
    from 'displayComponentsRoot/package.json';

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
        const infoText =
            `${componentPackage.name} ${componentPackage.version}`;

        return (
            <PageHeader>
                <Row verticalAlign = "middle">
                    <Column>
                        <Text><strong>LochNess</strong></Text>
                    </Column>
                    <Column align = "right">
                        <Text>{ infoText }</Text>
                    </Column>
                </Row>
            </PageHeader>
        );
    }
}
