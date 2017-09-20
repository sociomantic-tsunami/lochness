import React, { Component }                             from 'react';
import PropTypes                                        from 'prop-types';

import BoolToggle                                       from './BoolToggle';
import StringToggle                                     from './StringToggle';
import EnumToggle                                       from './EnumToggle';
import JsonToggle                                       from './ArrayToggle';
import FuncToggle                                       from './FuncToggle';
import NodeToggle                                       from './NodeToggle';
import NumberToggle                                     from './NumberToggle';

import { Label, ScrollBox, Table, TableRow, TableCell } from 'nessie';

export default class Configurator extends Component
{
    static propTypes =
    {
        componentName  : PropTypes.string,
        componentSpecs : PropTypes.object,
        componentProps : PropTypes.object
    };


    toogleTypeSwitch( propName, propType )
    {
        const { componentProps, componentName } = this.props;
        const { name, value } = propType;

        if ( name === 'bool' )
        {
            return (
                <BoolToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName } />
            );
        }
        else if ( name === 'enum' )
        {
            return (
                <EnumToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName }
                    options        = { value } />
            );
        }
        else if ( name === 'func' )
        {
            return (
                <FuncToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName } />
            );
        }
        else if ( name === 'node' )
        {
            return (
                <NodeToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName } />
            );
        }
        else if ( name === 'string' )
        {
            return (
                <StringToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName } />
            );
        }
        else if ( name === 'number' )
        {
            return (
                <NumberToggle
                    componentName  = { componentName }
                    componentProps = { componentProps }
                    propToToggle   = { propName } />
            );
        }

        return (
            <JsonToggle
                componentName  = { componentName }
                componentProps = { componentProps }
                propToToggle   = { propName } />
        );
    }


    render()
    {
        const { componentSpecs = {} } = this.props;

        return (
            <ScrollBox height = { 50 }>
                <Table isZebra columns = { [ { title: 'Prop', size: '1/2' }, { title: 'Value', size: '1/2' } ] }>
                    {
                        Object.keys( componentSpecs ).map( ( propName, index ) =>
                        {
                            const propData = componentSpecs[ propName ];

                            if ( propData.type )
                            {
                                return (
                                    <TableRow key = { index }>
                                        <TableCell>
                                            <Label htmlFor = { `prop-${index}` }>{ propData.required ? `${propName}*` : propName }</Label>
                                        </TableCell>
                                        <TableCell>
                                            { this.toogleTypeSwitch( propName, propData.type ) }
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        } )
                    }
                </Table>
            </ScrollBox>
        );
    }
}
