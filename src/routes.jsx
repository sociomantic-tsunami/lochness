/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import Editor           from './containers/Editor';
import Components       from './containers/Components';
import SingleComponent  from './containers/SingleComponent';
import ComponentToTest  from './containers/ComponentToTest';

import { Route, IndexRoute } from 'react-router';

const Routes = (
    <Route path="/" >

        <Route path="/components" component={Components}/>

        <Route path="/component" >
            <Route path="/component/:componentName" component={SingleComponent} />
            <IndexRoute component={Components} />
        </Route>

        <Route path="/ComponentToTest" >
            <Route path="/ComponentToTest/:componentName" component={ComponentToTest} />
            <IndexRoute component={ComponentToTest} />
        </Route>

        <Route path="/editor" component={Editor} />

        <IndexRoute component={Components} />
    </Route>
);

export default Routes;
