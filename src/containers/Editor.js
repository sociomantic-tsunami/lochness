/* global Babel */

import * as React                            from 'react';
import * as DisplayComponents                from 'displayComponentsDist';

import { Component }                         from 'react';
import { bindActionCreators }                from 'redux';
import { connect }                           from 'react-redux';

import Header                                from 'components/Header';
import Navigation                            from 'components/Navigation';

import LivePreview                           from 'components/LivePreview';

import updateCursor                          from 'actions/updateCursor';
import updateJsx                             from 'actions/updateJsx';
import updateComponent                       from 'actions/updateComponent';
import spliceJsx                             from 'actions/spliceJsx';
import resetJsx                              from 'actions/resetJsx';

import { nodeToJsx, unwrapNode }             from 'helpers/reactNodeHelpers';
import { cleanseJsx, wrapJsx }               from 'helpers/jsxHelpers';

import { html as beautifyHtml }              from 'js-beautify';

import {
    Button,
    CodeEditor,
    Column,
    FlounderDropdown,
    Module,
    Page,
    Row
} from 'nessie';

const babelOptions = { 'presets': [ 'react' ] };


class Editor extends Component
{
    render()
    {
        const { actions, components = {}, editor = {} } = this.props;

        const beautify = () =>
        {
            actions.updateJsx( beautifyHtml( editor.jsxString, { indent_size: 4, unformatted: [] } ) );
        };

        const insertJsx = () =>
        {
            const componentJsx = nodeToJsx(
                {
                    ...components[ editor.selectedComponent ],
                    type : { name: editor.selectedComponent }
                }
            );
            actions.spliceJsx( componentJsx, editor.cursor );
        };

        const selectComponent = ( e ) =>
        {
            actions.updateComponent( e.target.innerText.replace( /\r?\n|\r/, '' ) );
        };

        const wrappedJsx = wrapJsx( cleanseJsx( editor.jsxString ) );

        let errorStr  = '✓ JSX valid';
        let wrappedJs = '';

        try
        {
            wrappedJs = Babel.transform( wrappedJsx, babelOptions ).code;
        }
        catch ( err )
        {
            errorStr = err.message;
        }

        let wrappedNode = {};

        try
        {
            wrappedNode = eval( wrappedJs );
        }
        catch ( err )
        {
            console.error( 'eval error:', err.message );
        }

        const previewNode = unwrapNode( wrappedNode );

        return (
            <Page>
                <Header components = { components } />

                <Navigation currentPage = "editor" components = { components } />

                <Row align = "left">
                    <Column size = "1/6">
                        <FlounderDropdown
                            placeholder  = "Component to add"
                            data         = { components && Object.keys( components ) }
                            onChange     = { selectComponent }
                            defaultValue = { editor.selectedComponent }
                            search />
                    </Column>
                    <Column>
                        <Button
                            onClick      = { insertJsx }
                            isReadOnly   = { !editor.selectedComponent }
                            iconType     = "add">
                            Add
                        </Button>
                    </Column>
                    <Column>
                        <Button
                            onClick  = { beautify }
                            iconType = "validation">
                            Tidy JSX
                        </Button>
                    </Column>
                    <Column>
                        <Button
                            onClick  = { actions.resetJsx }
                            iconType = "delete">
                            Reset JSX
                        </Button>
                    </Column>
                </Row>

                <Row className = "editor">
                    <Column size = "2/5" className = "codeEditor">
                        <Module>
                            <CodeEditor
                                value            = { editor.jsxString }
                                onChange         = { actions.updateJsx }
                                options          = { { mode       : 'jsx',
                                indentUnit : 4 } }
                                onCursorActivity = { actions.updateCursor } />
                            <CodeEditor
                                value      = { errorStr }
                                options    = { { lineNumbers: false } }
                                isReadOnly />
                        </Module>
                    </Column>
                    <Column>
                        <LivePreview previewNode = { previewNode } />
                    </Column>
                </Row>
            </Page>
        );
    }
}


const mapStateToProps = ( state ) =>
{
    const props =
        {
            actions    : state.actions,
            components : state.components,
            editor     : state.editor
        };

    return props;
};

const mapDispatchToProps = ( dispatch ) =>
{
    const actions   = { updateComponent, updateCursor, resetJsx, spliceJsx, updateJsx };
    const actionMap = { actions: bindActionCreators( actions, dispatch ) };

    return actionMap;
};

export default connect( mapStateToProps, mapDispatchToProps )( Editor );
