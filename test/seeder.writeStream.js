/*jshint node:true */
"use strict";

var fs     = require("fs"),
    path   = require("path"),
    assert = require("assert"),

    ConcatStream = require("concat-stream"),

    Seeder = require("../lib/seeder");

describe("yui-seeder", function() {
    describe("Seeder._writeStream()", function() {
        after(function(done) {
            fs.unlink(path.join(__dirname, "/temp.js"), done);
        });

        it("should return a concat stream when output === \"stdout\"", function() {
            var s = new Seeder({
                    output : "stdout"
                }),
                stream = s._writeStream();

            assert(stream instanceof ConcatStream);
        });

        it("should return a file-writing stream when output is any other string", function() {
            var s = new Seeder({
                    cwd    : __dirname,
                    output : "./temp.js"
                }),
                stream = s._writeStream(function() {});

            assert(stream instanceof fs.WriteStream);
            assert(stream.flags === "w");
        });

        it("should return an appending file-writing stream when append is set", function() {
            var s = new Seeder({
                    cwd    : __dirname,
                    output : "./temp.js",
                    append : true
                }),
                stream = s._writeStream(function() {});

            assert(stream instanceof fs.WriteStream);
            assert(stream.flags === "a");
        });
    });
});
