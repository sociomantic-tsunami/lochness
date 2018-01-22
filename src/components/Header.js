import React, { Component }               from 'react';
import { PageHeader, Row, Column, Text }  from 'nessie-ui';
import nessiePackage                      from 'nessie-ui/package.json';

import svgSprite                          from 'nessie-ui/dist/sprite.html';


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
                    <Column size = "1/8">
                        <img src = "images/lochness.svg" width = "100%" />
                    </Column>
                    <Column align = "right">
                        <Text><strong>Lochness</strong></Text>
                        <Text>Nessie v.<strong>{nessiePackage.version}</strong></Text>
                        <Text>Sociomantic UI Style Guide and Component Creator</Text>
                    </Column>
                </Row>
            </PageHeader>
        );
    }
}
