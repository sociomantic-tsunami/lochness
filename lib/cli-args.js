/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const optionDefinitions = [
    {
        name         : 'components',
        alias        : 'c',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/'
    },
    {
        name          : 'componentsSrc',
        alias         : 's',
        type          : String,
    },
    {
        name         : 'componentsDist',
        alias        : 'd',
        type         : String,
    },
    {
        name         : 'env',
        alias        : 'e',
        type         : String,
        defaultValue : 'dev'
    },
    {
        name         : 'showcasePropsJson',
        alias        : 'j',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/src/defaults.json'
    },
    {
        name         : 'visualTestType',
        alias        : 't',
        type         : String,
        defaultValue : 'test' // 'test' or 'reference' or 'accept'
    },
    {
        name         : 'visualTestFilter',
        alias        : 'f',
        type         : String,
        defaultValue : '' // subset of components to test
    }
];

export default optionDefinitions;
