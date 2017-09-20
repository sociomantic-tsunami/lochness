// /*eslint-env node, mocha */
// /*global expect */
// /*eslint no-console: 0*/
// 'use strict';

// // Uncomment the following lines to use the react test utilities
// // import ReactAdd from 'react/addons';
// // const TestUtils = ReactAdd.addons.TestUtils;
// // import createComponent from 'helpers/shallowRenderHelper';
// import { shallow, render, mount } from 'enzyme';
// import React from 'react';

// import Main from 'components/Main';
// import * as Nessie from 'nessie';

// describe( 'MainComponent', () =>
// {
//     let MainComponent;

//     beforeEach( () =>
//     {
//         MainComponent = mount( <Main /> );
//     });

//     it( 'should exist and there be only one of it', () =>
//     {
//         // console.log( 'MAIIINN' , MainComponent.html );
//         expect( MainComponent.find( Main ) ).to.have.length( 1 );
//     });

//     it ( 'should have render method', () =>
//     {
//         expect( MainComponent.render ).to.not.equal( undefined );
//     });

//     // it( 'should list all components', () =>
//     // {
//     //     expect( MainComponent.find( Nessie.NessieTabs ).length ).to.equal( Object.keys(Nessie).length );
//     // });
// });

// describe( 'MainComponent.getReadme()', () =>
// {
//     it( 'should exist', () =>
//     {
//         expect( Main.prototype.getReadme ).to.have.length( 1 );
//     });
// });

// describe( 'MainComponent.getSpecsJson()', () =>
// {
//     it( 'should exist', () =>
//     {
//         expect( Main.prototype.getSpecsJson ).to.have.length( 1 );
//     });
// });

// // it( 'should have its component name as default className', () =>
// // {
// //     expect( MainComponent.props.className ).to.equal( 'index' );
// // });