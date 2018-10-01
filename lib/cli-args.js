import path from 'path';

const optionDefinitions = [
    {
        name          : 'libName',
        alias         : 'n',
        type          : String
    },
    {
        name          : 'lib',
        alias         : 'l',
        type          : String,
        defaultValue : './'
    },
    {
        name          : 'src',
        alias         : 's',
        type          : String,
        defaultValue : 'src'
    },
    {
        name         : 'dist',
        alias        : 'd',
        type         : String
    },
    {
        name         : 'env',
        alias        : 'e',
        type         : String,
        defaultValue : 'dev'
    },
    {
        name         : 'props',
        alias        : 'j',
        type         : String,
        defaultValue : path.resolve( __dirname, '../defaults.json' )
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
