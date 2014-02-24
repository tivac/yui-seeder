/*jshint node:true */
"use strict";

module.exports = {
    module : {
        position : 0,
        help     : "YUI alias/module to use for module merging",
        required : true
    },

    configs : {
        string   : "-c CONFIG --configs=CONFIG",
        help     : "Config file paths to resolve modules dependencies",
        list     : true,
        required : true
    },

    output : {
        string  : "-o FILE   --output=FILE",
        help    : "File to write the merged modules to",
        default : "stdout"
    },

    append : {
        string  : "-a,       --append",
        help    : "Append merged modules instead of overwriting",
        flag    : true
    }
};
