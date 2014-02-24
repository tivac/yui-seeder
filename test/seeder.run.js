/*jshint node:true */
"use strict";

var fs     = require("fs"),
    path   = require("path"),
    assert = require("assert"),

    Seeder = require("../lib/seeder"),
    temp   = path.join(__dirname, "/temp.js");

describe("yui-seeder", function() {
    describe("Seeder Class", function() {
        afterEach(function(done) {
            if(fs.existsSync(temp)) {
                return fs.unlink(temp, done);
            }

            done();
        });

        it("should throw when no callback is provided", function() {
            var s = new Seeder();

            assert.throws(function() {
                s.run();
            });

            assert.throws(function() {
                s.run("a");
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

        it("should call done with no args on success", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/simple",
                configs : [ "_config.js" ],
                modules : [ "a" ]
            });

            s.run(function(err) {
                assert.ifError(err);

                done();
            });
        });

        it("should pass the combined modules to done", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/simple",
                configs : [ "_config.js" ],
                modules : [ "a" ]
            });

            s.run(function(err, data) {
                assert.ifError(err);
                
                assert(data);
                assert(data.indexOf("YUI.add(\"a") > -1);
                assert(data.indexOf("YUI.add(\"b") > -1);
                assert(data.indexOf("YUI.add(\"c") > -1);

                done();
            });
        });

        it("should pass the combined modules from multiple configs to done", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/multiple",
                configs : [ "./one/_config.js", "./two/_config.js" ],
                modules : [ "a", "f" ]
            });

            s.run(function(err, data) {
                assert.ifError(err);
                
                assert(data);
                assert(data.indexOf("YUI.add(\"a") > -1);
                assert(data.indexOf("YUI.add(\"b") > -1);
                assert(data.indexOf("YUI.add(\"c") > -1);
                assert(data.indexOf("YUI.add(\"f") > -1);

                done();
            });
        });

        it("should write the combined modules to a file", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/simple",
                configs : [ "_config.js" ],
                modules : [ "a" ],
                output  : temp
            });

            s.run(function(err) {
                var result;

                assert.ifError(err);
                
                result = fs.readFileSync(temp, "utf8");

                assert(result);
                assert(result.indexOf("YUI.add(\"a") > -1);
                assert(result.indexOf("YUI.add(\"b") > -1);
                assert(result.indexOf("YUI.add(\"c") > -1);

                done();
            });
        });

        it("should write the combined modules to a file", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/simple",
                configs : [ "_config.js" ],
                modules : [ "a" ],
                output  : temp
            });

            fs.writeFileSync(temp, "fooga booga");

            s.run(function(err) {
                var result;

                assert.ifError(err);
                
                result = fs.readFileSync(temp, "utf8");

                assert(result);
                assert(result.indexOf("fooga booga") === -1);
                assert(result.indexOf("YUI.add(\"a") > -1);
                assert(result.indexOf("YUI.add(\"b") > -1);
                assert(result.indexOf("YUI.add(\"c") > -1);

                done();
            });
        });

        it("should append to existing contents if requested", function(done) {
            var s = new Seeder({
                cwd     : "./test/specimens/simple",
                configs : [ "_config.js" ],
                modules : [ "a" ],
                output  : temp,
                append  : true
            });

            fs.writeFileSync(temp, "fooga booga");

            s.run(function(err) {
                var result;

                assert.ifError(err);
                
                result = fs.readFileSync(temp, "utf8");

                assert(result);
                assert(result.indexOf("fooga booga") > -1);
                assert(result.indexOf("YUI.add(\"a") > -1);
                assert(result.indexOf("YUI.add(\"b") > -1);
                assert(result.indexOf("YUI.add(\"c") > -1);

                done();
            });
        });
    });
});
