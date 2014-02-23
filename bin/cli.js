/*jshint node:true */
"use strict";

var Seeder = require("../lib/seeder"),
    argv   = require("nomnom")
        .script("seeder")
        .options(require("../args.js"))
        .parse(),

    seeder;

seeder = new Seeder(argv);

seeder.run(function(err, data) {
    if(err) {
        console.error(err);

        return process.on("exit", function() {
            process.exit(1);
        });
    }

    if(data) {
        // process.stdout instad of console.log to avoid extra
        // trailing newlines
        process.stdout.write(data);
    }
});
