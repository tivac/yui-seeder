/*jshint node:true */
"use strict";

var path   = require("path"),
    assert = require("assert"),

    Seeder = require("../lib/seeder");

describe("yui-seeder", function() {
    describe("Seeder Class", function() {
        describe("_loadConfig()", function() {
            it("should find a config using globs", function(){
                var s = new Seeder({
                        cwd    : "./test/specimens/simple",
                        config : "**/_config.js"
                    }),
                    config = s._loadConfig();

                assert(config.length);
                assert.equal(config, path.normalize("test/specimens/simple/_config.js"));
            });

            it("should return false when a config can't be found", function() {
                var s = new Seeder({
                        cwd    : "./test/specimens/simple",
                        config : "**/_fooga.js"
                    }),
                    config = s._loadConfig();

                assert.equal(config, false);
            });
        });
    });
});
