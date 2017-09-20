import React, { Component }                                    from 'react';
import { bindActionCreators }                                  from 'redux';
import { connect }                                             from 'react-redux';

import updateFilter                                            from 'actions/updateFilter';
import toggleCollapse                                          from 'actions/toggleCollapse';
import switchTab                                               from 'actions/switchTab';

import ComponentContainer                                      from 'components/ComponentContainer';
import Header                                                  from 'components/Header';
import Navigation                                              from 'components/Navigation';
import Footer                                                  from 'components/Footer';

import { getComponentReadme, getComponentSpecs }               from 'helpers/componentHelpers';

import { Page, PageContent, PageContentHeader, TextInput, H1 } from 'nessie';

class Components extends Component
{
    constructor( props )
    {
        super( props );
    }

    updateFilter = ( value ) =>
    {
        const { actions } = this.props;
        actions.updateFilter( { newString: value }, { debounce: 100 } );
    };

    render()
    {
        const { components = {}, filterString, actions } = this.props;


        const componentNames = Object.keys( components );


        const filteredComponentNames =
            typeof filterString === 'string' && filterString.trim().length ?
            componentNames.filter(
                ( name ) =>
                {
                    const regex = new RegExp( filterString, 'i' );
                    return name.match( regex );
                }
            ) : componentNames;


        const componentContainers = filteredComponentNames.map(
            ( componentName ) =>
        {
                const component = components[ componentName ];
                if ( componentName !== 'filterString' )
                {
                    return (

                        <ComponentContainer
                            name           = { componentName }
                            props          = { component.props }
                            readme         = { getComponentReadme( componentName ) }
                            specs          = { getComponentSpecs( componentName ) }
                            activeTabIndex = { component.activeTabIndex }
                            isCollapsible
                            isCollapsed    = { component.isCollapsed }
                            key            = { componentName }
                            actions        = { actions } />
                    );
                }
            } );

        const noResults = <div>No components matching <em>{ filterString }</em></div>;

        let searchInput;

        return (
            <Page>
                <Header components = { components } />
                <Navigation currentPage = "components" components = { components } />
                <PageContent>
                    <PageContentHeader>
                        <H1>Components</H1>
                        <section>
                            <TextInput
                                ref         = { node =>
{
                                    searchInput = node;
                                } }
                                label       = "Filter"
                                placeholder = "Type a component name"
                                onChange    = { ( e ) =>
{
                                    const value = e.target.value;
                                    searchInput.value = value;
                                    this.updateFilter( value );
                                }
                                    } />
                        </section>
                    </PageContentHeader>
                    { ( componentContainers.length && componentContainers ) || noResults }
                </PageContent>
                <Footer />
            </Page>
        );
    }
}

const mapStateToProps = ( state ) =>
{
    const props =
        {
            actions      : state.actions,
            components   : state.components,
            filterString : state.components.filterString
        };

    return props;
};

const mapDispatchToProps = ( dispatch ) =>
{
    const actions   = { toggleCollapse, switchTab, updateFilter };
    const actionMap = { actions: bindActionCreators( actions, dispatch ) };

    return actionMap;
};

export default connect( mapStateToProps, mapDispatchToProps )( Components );
