yui-seeder
==========
[![Build Status](https://travis-ci.org/tivac/yui-seeder.png?branch=master)](https://travis-ci.org/tivac/yui-seeder)
[![NPM version](https://badge.fury.io/js/yui-seeder.png)](http://badge.fury.io/js/yui-seeder)
[![Dependency Status](https://david-dm.org/tivac/yui-seeder.png?theme=shields.io)](https://david-dm.org/tivac/yui-seeder)
[![devDependency Status](https://david-dm.org/tivac/yui-seeder/dev-status.png?theme=shields.io)](https://david-dm.org/tivac/yui-seeder#info=devDependencies)

Create single file seeds for your YUI application based off existing modules or aliases.

## Usage ##

```
Usage: seeder <module> [options]

module     YUI alias/module to use for module merging

Options:
   -c CONFIG --config=CONFIG   Glob filter used to locate the YUI module config  [**/_config.js]
   -o FILE   --output=FILE     File to write the merged modules to  [stdout]
   -a,       --append          Append merged modules instead of overwriting
```
