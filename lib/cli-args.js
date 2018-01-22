const optionDefinitions = [
    {
        name         : 'componentsRoot',
        alias        : 'r',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/'
    },
    {
        name          : 'componentsSrc',
        alias         : 's',
        type          : String,
        defaultOption : true,
        defaultValue  : 'node_modules/nessie-ui/src'
    },
    {
        name         : 'componentsDist',
        alias        : 'd',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/dist'
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
