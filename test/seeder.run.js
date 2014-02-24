/*jshint node:true */
"use strict";

var path   = require("path"),
    assert = require("assert"),

    Seeder = require("../lib/seeder");

describe("yui-seeder", function() {
    describe("Seeder Class", function() {
        it("should throw when no callback is provided");
        it("should provide an error if a config can't be found");
        it("should provide an error if no modules would be combined");
        it("should provide an error if a module can't be found");

        it("should call done with no args on success");
        it("should write out a file containing combined modules");
        it("should overwrite existing contents by default");
        it("should append to existing contents if requested");
    });
});
