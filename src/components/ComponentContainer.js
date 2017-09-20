import React, { Component }                   from 'react';
import PropTypes                              from 'prop-types';

import ReactDOMServer                         from 'react-dom/server';
import { Link }                               from 'react-router';
import * as DisplayComponents                 from 'displayComponentsDist';
import { Column, H2, IconButton, Module, Tab, Row, Tabs } from 'nessie';

import CodeViewer                             from './CodeViewer.js';
import SpecsTable                             from './SpecsTable.js';
import Configurator                           from './Configurator.js';
import ModalWrapper                           from './ModalWrapper.js';

import { nodeToJsx }                          from 'helpers/reactNodeHelpers';


export default class ComponentContainer extends Component
{
    static propTypes =
    {
        name           : PropTypes.string.isRequired,
        props          : PropTypes.object,
        readme         : PropTypes.string,
        specs          : PropTypes.object,
        activeTabIndex : PropTypes.oneOfType(
            [
                PropTypes.string,
                PropTypes.number
            ] ),
        isCollapsible : PropTypes.bool,
        isCollapsed   : PropTypes.bool,
        actions       : PropTypes.object.isRequired
    };

    static defaultProps =
    {
        activeTabIndex : 0,
        isCollapsible  : false,
        isCollapsed    : false
    };

    shouldComponentUpdate( newProps )
    {
        if ( JSON.stringify( this.props ) === JSON.stringify( newProps ) )
        {
            return false;
        }

        return true;
    }


    render()
    {
        const { actions, activeTabIndex, isCollapsed, isCollapsible, name,
            props, readme, specs } = this.props;

        if( ! DisplayComponents )
            throw new Error( 'DisplayComponents is undefined' );

        const ComponentToDisplay = DisplayComponents[ name ];

        const component = React.createElement( ComponentToDisplay, props );
        const lochnessProps = component.props.lochness ? component.props.lochness : {};

        const collapseToggle = () =>
        {
            actions.toggleCollapse( { component: name, isCollapsed: !isCollapsed } );
        };

        const switchTab = ( e, newProps ) =>
        {
            if ( actions && actions.switchTab )
            {
                actions.switchTab( { component: name, ...newProps } );
            }
        };

        const createMarkup = ( html ) => ( { __html: html } );
        const readmeExists = readme.length > 0;

        const customHeader = (
            <Row>
                <Column>
                    <H2>
                        <Link to = { `component/${name}` }>{name}</Link>
                    { ( lochnessProps.isDeprecated && ' (Deprecated)' ) ||
                                  ( lochnessProps.isBeta && ' (Beta)' ) }
                    </H2>
                </Column>
                { isCollapsible &&
                    <Column size="content">
                        <IconButton iconType = { isCollapsed ? 'down' : 'up' } />
                    </Column>
                }
            </Row>
        );

        return (

            <Module
                customHeader  = { customHeader }
                isCollapsible = { isCollapsible }
                isCollapsed   = { isCollapsed }
                onClickHeader = { collapseToggle }>

                <Tabs
                    activeTabIndex = { activeTabIndex }
                    onChange = { switchTab }>
                    <Tab label = "Component">
                        <Row>
                            <Column
                                size  = "1/2"
                                align = "left">
                                { name === 'ModalDialog' ? <ModalWrapper { ...props } /> : component }
                            </Column>
                            <Column
                                size      = "1/2">
                                <Configurator
                                    componentName  = { name }
                                    componentProps = { component.props }
                                    componentSpecs = { specs } />
                            </Column>
                        </Row>
                    </Tab>
                    <Tab label = "JSX">
                        <CodeViewer code = { nodeToJsx( component ) } />
                    </Tab>
                    {
                        readmeExists &&
                        <Tab label = "HTML" isDisabled = { lochnessProps.disableCode }>
                            <CodeViewer code = { ReactDOMServer.renderToString( component ) } />
                        </Tab>
                    }
                </Tabs>
                {
                    readmeExists &&
                    <Module
                        headerLevel = { 3 } title = "Description" isCollapsible onToggle = { () =>
                            {
                                console.log( 'toggle desc' );
                            } }>
                            <div dangerouslySetInnerHTML = { createMarkup( readme ) } />
                        </Module>
                }
                <Module
                    headerLevel = { 3 } title = "Specifications" isCollapsible onToggle = { () =>
{
                        console.log( 'toggle spec' );
                    } }>
                    <SpecsTable specs = { specs } />
                </Module>
            </Module>
        );
    }
}
