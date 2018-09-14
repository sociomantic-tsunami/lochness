# LochNess
[![GitHub package version](https://img.shields.io/github/package-json/v/sociomantic-tsunami/lochness.svg?style=plastic)]()
[![LochNess build status](https://travis-ci.org/sociomantic-tsunami/lochness.svg)](https://travis-ci.org)

Show off your monstrous React components. Automatically test if they are what you think they are.

Displays all [nessie](https://github.com/sociomantic-tsunami/nessie/) components by default, shows specs, states and allows simple module creation and markup export.

## Install

In your project type `yarn add lochness`


## Serving your components

`yarn loch`

The following flags are available:

* `--components` (`-c`) : the React components to display relative to your app dir.
* `--env` (`-e`) :  which LochNess environment should you use? (Dev by default).
* `--showcasePropsJson` (`-j`) A defaults.json file of example props to pass to displayed components.

eg:

`yarn loch -c ./ -j src/defaults.json`;


## Testing your components

LochNess uses backstop.js to test your components. A `backstop_data` dir will
be created in your project root.

First generate your baseline if you don't have it already.
`yarn visualTestGeneration -s src -d dist -j src/defaults.json`

and then test:

`yarn visualTest -s src -d dist -j src/defaults.json`

You can test / generate a subset of tests by passing the `-f` flag followed by the camelCase name of the component (`textInput` for eg.).

`yarn visualTest -s src -d dist -j src/defaults.json -f textInput`


## Viewing your component site

### Component View

Here you can see all of the components, live and interactive in the browser.
Switching to `code` view, will give you the html markup needed for this component.

### Editor View

The editor allows you to create a module / component using jsx syntax, such as:
```jsx
<NessieModule>
    <NessieTextInput label="OurLabel"/>
</NessieModule>
```
This is translated live to both a module preview, and markup with you can utilise for any module / component.

Styles are applied through a generated style.css file.


## Development

You can develop LochNess using the `dev` env, and `yarn start` does this for you.

It will use precompiled nessie components by default.


## Editing bins

To work on the CLI, you'll need to edit `lib` files which are compiled to the
`bin` folder (excluded from master).

You have `yarn bin:build` and `yarn bin:watch` to aid development here.

NOTE: you _may_ need to make the result of this executable to run in another
project. (`chmod +x bin/*`).


## Contributing

We gladly accept and review any pull-requests. Feel free! :heart:

This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[LochNess - Code of Conduct](https://github.com/sociomantic-tsunami/lochness/blob/master/CODE_OF_CONDUCT.md)




# Changelog

[CHANGELOG.MD](https://github.com/sociomantic-tsunami/lochness/blob/master/CHANGELOG.md)
