const optionDefinitions = [
    {
        name          : 'componentsSrc',
        alias         : 's',
        type          : String,
        defaultOption : true,
        defaultValue  : 'node_modules/nessie/src'
    },
    {
        name         : 'componentsDist',
        alias        : 'd',
        type         : String,
        defaultValue : 'node_modules/nessie/dist'
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
        defaultValue : 'node_modules/nessie/src/defaults.json'
    },
    {
        name        : 'visualTestType',
        alias       : 't',
        type         : String,
        defaultValue : 'test' // 'test' or 'reference' or 'accept'
    },
    {
        name        : 'visualTestFilter',
        alias       : 'f',
        type         : String,
        defaultValue : '' // subset of components to test
    }
];

export default optionDefinitions;
