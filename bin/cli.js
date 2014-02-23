/*jshint node:true */
"use strict";

var argv = require("nomnom")
    .script("seeder")
    .options(require("../args.js"))
    .parse();

console.log(argv);
