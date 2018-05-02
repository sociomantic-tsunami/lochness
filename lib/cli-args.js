const optionDefinitions = [
    {
        name         : 'components',
        alias        : 'c',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/dist/index.js'
    },
    {
        name         : 'styles',
        alias        : 'x',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/dist/styles.css'
    },
    {
        name  : 'componentsSrc',
        alias : 's',
        type  : String,
        defaultValue : 'node_modules/nessie-ui/src/'
    },
    {
        name  : 'name',
        alias : 'n',
        type  : String,
        defaultValue : 'Nessie'
    },

    // {
    //     name  : 'componentsDist',
    //     alias : 'd',
    //     type  : String,
    // },
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
