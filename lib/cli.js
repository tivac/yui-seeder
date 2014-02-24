/*jshint node:true */
"use strict";

module.exports = function(process, Seeder) {
    var argv = require("nomnom")
            .script("seeder")
            .options(require("../args.js"))
            .parse(process.argv.slice(2));

    (new Seeder(argv)).run(function(err, data) {
        if(err) {
            process.stderr.write(err.toString("utf8"));

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
};
