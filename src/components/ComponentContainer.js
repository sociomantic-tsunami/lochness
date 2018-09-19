/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import ReactDOMServer         from 'react-dom/server';
import { Link }               from 'react-router';
import DisplayComponents from 'displayComponents';
import {
    Column,
    H2,
    IconButton,
    Module,
    Tab,
    Tabs,
    Row,
} from 'nessie-ui';

import CodeViewer             from './CodeViewer';
import SpecsTable             from './SpecsTable';
import Configurator           from './Configurator';
import ModalWrapper           from './ModalWrapper';

import { nodeToJsx }          from 'helpers/reactNodeHelpers';


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
        isCollapsible    : PropTypes.bool,
        isCollapsed      : PropTypes.bool,
        descIsCollapsed  : PropTypes.bool,
        specsIsCollapsed : PropTypes.bool,
        actions          : PropTypes.object.isRequired
    };

    static defaultProps =
    {
        activeTabIndex   : 0,
        descIsCollapsed  : false,
        isCollapsible    : false,
        isCollapsed      : false,
        specsIsCollapsed : false,
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
        const {
            actions,
            activeTabIndex,
            descIsCollapsed,
            isCollapsed,
            isCollapsible,
            name,
            props,
            readme,
            specs,
            specsIsCollapsed,
         } = this.props;

        if ( !DisplayComponents )
        {
            throw new Error( 'DisplayComponents is undefined' );
        }

        const ComponentToDisplay = DisplayComponents[ name ];

        const component = React.createElement( ComponentToDisplay, props );
        const lochnessProps =
            component.props.lochness ? component.props.lochness : {};

        const collapseToggle = () =>
        {
            actions.toggleCollapse( {
                component   : name,
                isCollapsed : !isCollapsed,
            } );
        };

        const collapseToggleDesc = () =>
        {
            actions.toggleCollapseDesc( {
                component       : name,
                descIsCollapsed : !descIsCollapsed,
            } );
        };

        const collapseToggleSpecs = () =>
        {
            actions.toggleCollapseSpecs( {
                component        : name,
                specsIsCollapsed : !specsIsCollapsed,
            } );
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
                        { lochnessProps.isDeprecated && ' (Deprecated)' }
                        { lochnessProps.isBeta && ' (Beta)' }
                    </H2>
                </Column>
                { isCollapsible &&
                    <Column size = "content">
                        <IconButton
                            iconType = { isCollapsed ? 'down' : 'up' } />
                    </Column>
                }
            </Row>
        );

        return (
            <Module
                customHeader  = { customHeader }
                isCollapsible = { isCollapsible }
                isCollapsed   = { isCollapsed }
                onClickHeader = { collapseToggle }
                onClickToggle = { collapseToggle }>
                <Tabs
                    activeTabIndex = { activeTabIndex }
                    onChange = { switchTab }>
                    <Tab label = "Component">
                        <Row>
                            <Column
                                size  = "1/2"
                                align = "left">
                                { name === 'ModalDialog' ?
                                    <ModalWrapper { ...props } /> : component }
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
                    <Tab
                        label = "HTML"
                        isDisabled = { lochnessProps.disableCode }>
                        <CodeViewer code = { ReactDOMServer.renderToString( component ) } />
                    </Tab>
                </Tabs>
                { readmeExists &&
                    <Module
                        isCollapsible
                        headerLevel   = { 3 }
                        isCollapsed   = { descIsCollapsed }
                        onClickHeader = { collapseToggleDesc }
                        onClickToggle = { collapseToggleDesc }
                        title         = "Description">
                        <div dangerouslySetInnerHTML = { createMarkup( readme ) } />
                    </Module>
                }
                <Module
                    isCollapsible
                    headerLevel   = { 3 }
                    isCollapsed   = { specsIsCollapsed }
                    onClickHeader = { collapseToggleSpecs }
                    onClickToggle = { collapseToggleSpecs }
                    title         = "Specifications">
                    <SpecsTable specs = { specs } />
                </Module>
            </Module>
        );
    }
}
