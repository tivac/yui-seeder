/*jshint node:true */
"use strict";

module.exports = {
    modules : {
        position : 0,
        help     : "YUI aliases/modules to use for generation",
        required : true,
        list     : true
    },

    configs : {
        string   : "-c CONFIG --configs=CONFIG",
        help     : "Config file paths",
        list     : true,
        required : true
    },

    output : {
        string  : "-o FILE   --output=FILE",
        help    : "File to write merged modules to",
        default : "stdout"
    },

    append : {
        string  : "-a,       --append",
        help    : "Append output instead of overwriting",
        flag    : true
    }
};
