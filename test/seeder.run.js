/*jshint node:true */
"use strict";

var path   = require("path"),
    assert = require("assert"),

    Seeder = require("../lib/seeder");

describe("yui-seeder", function() {
    describe.only("Seeder Class", function() {
        it("should throw when no callback is provided", function() {
            var s = new Seeder();

            assert.throws(function() {
                s.run()
            });
        });

        it("should provide an error if a config can't be found", function(done) {
            var s = new Seeder({
                    configs : [ "fooga.js" ]
                });

            s.run(function(err) {
                assert(err);
                assert(err.toString().indexOf("Cannot find module") > -1);

                done();
            });
        });

        it("should provide an error if no modules would be combined", function(done) {
            var s = new Seeder({
                    cwd     : "./test/specimens/simple",
                    configs : [ "_config.js" ],
                    modules : [ "fooga" ]
                });

            s.run(function(err) {
                assert(err);
                assert(err.toString().indexOf("No modules to concat") > -1);

                done();
            });
        });

        it("should provide an error if a module can't be found");

        it("should call done with no args on success");
        it("should write out a file containing combined modules");
        it("should overwrite existing contents by default");
        it("should append to existing contents if requested");
    });
});
