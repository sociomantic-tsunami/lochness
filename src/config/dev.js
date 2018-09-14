/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import baseConfig from './base';

const config = {
    appEnv : 'dev'  // feel free to remove the appEnv property here
};

export default Object.freeze( Object.assign( {}, baseConfig, config ) );
