/*jshint node:true */
"use strict";

var fs     = require("fs"),
    path   = require("path"),
    assert = require("assert"),

    nixt    = require("nixt"),

    base    = "node ../../../bin/cli.js ",
    options = {
        newlines : true
    },
    temp    = path.join(__dirname, "/temp.js");;

describe("yui-seeder", function() {
    describe("CLI", function() {
        afterEach(function(done) {
            if(fs.existsSync(temp)) {
                return fs.unlink(temp, done);
            }

            done();
        });

        it("should display help on -h", function(done) {
            nixt(options)
                .run("node bin/cli.js -h")
                .stdout(/seeder <modules>.../)
                .end(done);
        });

        it("should require modules", function(done) {
            nixt(options)
                .cwd("./test/specimens/simple")
                .base("node ../../../bin/cli.js ")
                .run("--config=fooga.js")
                .stdout(/modules argument is required/)
                .code(1)
                .end(done);
        });

        it("should require configs", function(done) {
            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("fooga")
                .stdout(/configs argument is required/)
                .code(1)
                .end(done);
        });

        it("should output to stdout by default", function(done) {
            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("--config=_config.js a")
                .code(0)
                .stdout(/YUI\.add\("a"/)
                .stdout(/YUI\.add\("b"/)
                .stdout(/YUI\.add\("c"/)
                .end(done);
        });

        it("should support multiple modules", function(done) {
            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("--config=_config.js b c")
                .code(0)
                .stdout(/YUI\.add\("b"/)
                .stdout(/YUI\.add\("c"/)
                .end(done);
        });

        it("should support multiple configs", function(done) {
            nixt(options)
                .cwd("./test/specimens/multiple")
                .base(base)
                .run("--config=./one/_config.js --config=./two/_config.js a f")
                .code(0)
                .stdout(/YUI\.add\("a"/)
                .stdout(/YUI\.add\("b"/)
                .stdout(/YUI\.add\("c"/)
                .stdout(/YUI\.add\("f"/)
                .end(done);
        });

        it("should output to the configured file", function(done) {
            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("--config=_config.js --output=\"" + temp + "\" a")
                .code(0)
                .exist(temp)
                .match(temp, /YUI\.add\("a"/)
                .match(temp, /YUI\.add\("b"/)
                .match(temp, /YUI\.add\("c"/)
                .end(done);
        });

        it("should overwrite the configured file", function(done) {
            fs.writeFileSync(temp, "fooga booga");

            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("--config=_config.js --output=\"" + temp + "\" a")
                .code(0)
                .exist(temp)
                .match(temp, /[^(?:fooga booga)]/)
                .match(temp, /YUI\.add\("a"/)
                .match(temp, /YUI\.add\("b"/)
                .match(temp, /YUI\.add\("c"/)
                .end(done);
        });

        it("should append to the configured file", function(done) {
            fs.writeFileSync(temp, "fooga booga");

            nixt(options)
                .cwd("./test/specimens/simple")
                .base(base)
                .run("--config=_config.js --output=\"" + temp + "\" --append a")
                .code(0)
                .exist(temp)
                .match(temp, /^fooga booga/)
                .match(temp, /YUI\.add\("a"/)
                .match(temp, /YUI\.add\("b"/)
                .match(temp, /YUI\.add\("c"/)
                .end(done);
        });
    });

    describe.skip("CLI-Node", function() {
        var proxyquire = require("proxyquire");

        it("should display help on -h", function(done) {
            var cli = proxyquire("./bin/cli.js", {
                    process : {
                        argv : "node bin/cli.js -h".split(" "),

                    }
                })
        });
    });
});
