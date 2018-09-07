/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

#! /usr/bin/env node
import commandLineArgs   from 'command-line-args';

import optionDefinitions from './cli-args';
import setupServer       from './serve';

const options = commandLineArgs( optionDefinitions );

setupServer( options );
