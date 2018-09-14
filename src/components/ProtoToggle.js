/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Component }        from 'react';
import PropTypes            from 'prop-types';

/**
 * Simply checks if the toggling prop has changed.
 * @type {Object}
 */
class ProtoToggle extends Component
{
    static propTypes =
    {
        componentProps : PropTypes.shape,
        propToToggle   : PropTypes.string
    };

    shouldComponentUpdate( nextProps )
    {
        const { propToToggle } = nextProps;
        const nextComponentProps = nextProps.componentProps;
        const { componentProps } = this.props;

        return JSON.stringify( nextComponentProps[ propToToggle ] ) !==
                            JSON.stringify( componentProps[ propToToggle ] );
    }

}

export default ProtoToggle;
