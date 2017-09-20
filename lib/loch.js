#! /usr/bin/env node
import commandLineArgs     from 'command-line-args';
import optionDefinitions   from './cli-args';
import setupServer         from './serve';

const options = commandLineArgs( optionDefinitions );

setupServer( options );
