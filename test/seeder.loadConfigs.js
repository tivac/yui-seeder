/*jshint node:true */
"use strict";

var path   = require("path"),
    assert = require("assert"),

    Seeder = require("../lib/seeder");

describe("yui-seeder", function() {
    describe("Seeder._loadConfigs()", function() {
        it("should load a single config", function(){
            var s = new Seeder({
                    cwd     : "./test/specimens/simple",
                    configs : [ "_config.js" ]
                }),
                config = s._loadConfigs();

            assert(typeof config === "object");
            assert.equal(
                config,
                require(path.resolve(__dirname, "./specimens/simple/_config.js"))
            );
        });

        it("should load multiple configs & single-level merge them", function() {
            var s = new Seeder({
                    cwd     : "./test/specimens/multiple",
                    configs : [ "./one/_config.js", "./two/_config.js" ]
                }),
                config = s._loadConfigs();

            assert(typeof config === "object");
            assert(config.groups);
            assert(config.groups.one);
            assert(config.groups.two);
        });

        it("should return an error when a config can't be found", function() {
            var s = new Seeder({
                    cwd     : "./test/specimens/simple",
                    configs : [ "_config", "_fooga.js" ]
                }),
                config = s._loadConfigs();

            assert(
                config.toString().indexOf(
                    path.resolve(
                        __dirname,
                        "./specimens/simple/_fooga.js"
                    )
                ) > -1
            );
        });
    });
});
