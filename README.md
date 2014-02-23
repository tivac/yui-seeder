yui-seeder
==========

Create single file seeds for your YUI application based off an existing module or an alias named "seed"

## Usage ##

Usage: seeder <module> [options]

module     YUI alias/module to use for module merging

Options:
   -c CONFIG --config=CONFIG   Glob filter used to locate the YUI module config  [**/_config.js]
   -o FILE   --output=FILE     File to write the merged modules to  [stdout]
   -a,       --append          Append merged modules instead of overwriting
