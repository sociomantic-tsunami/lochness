const optionDefinitions = [
    {
        name          : 'lib',
        alias         : 'c',
        type          : String,
        defaultValue : 'node_modules/nessie-ui/dist/'
    },
    {
        name          : 'src',
        alias         : 's',
        type          : String,
        defaultValue : 'node_modules/nessie-ui/src'
    },
    {
        name         : 'dist',
        alias        : 'd',
        type         : String,
        defaultValue : 'node_modules/nessie-ui/'
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
        type         : String
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
