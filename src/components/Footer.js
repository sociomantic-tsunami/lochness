import React, { Component }                          from 'react';
import { PageFooter, Row, Column, NessieLogo, Text } from 'nessie';

export default class LochnessFooter extends Component
{
    render()
    {
        return (
            <PageFooter>
                <Row align = "right">
                    <Column
                        size  = "1/6"
                        align = "center">
                        <NessieLogo />
                        <Text>made with Nessie</Text>
                    </Column>
                </Row>
            </PageFooter>
        );
    }
}
