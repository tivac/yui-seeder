/*jshint node:true */
"use strict";

var fs   = require("fs"),
    path = require("path"),

    _       = {
        defaults : require("lodash.defaults"),
        merge    : require("lodash.merge")
    },
    Y       = require("yui/loader"),
    Kat     = require("kat"),
    concat  = require("concat-stream"),
    globule = require("globule"),

    Seeder;

Seeder = function(argv) {
    this.opts = _.defaults(argv || {}, {
        cwd    : process.cwd(),
        output : "stdout"
    });
};

Seeder.prototype = {
    _loadConfigs : function() {
        var self    = this,
            configs = this.opts.configs.map(function(config) {
                return path.resolve(self.opts.cwd, config);
            });

        // Check to ensure that all the configs exist
        try {
            configs = configs.map(function(config) {
                return require(config);
            });
        } catch(e) {
            return e;
        }

        // Merge all the configs, which is mostly like what YUI does (only not exactly)
        // TODO: Will this cause issues?
        // TODO: Do I need to figure out how to use YUI.applyConfig instead?
        return _.merge.apply(_, configs);
    },

    _writeStream : function(done) {
        var writer;

        if(this.opts.output === "stdout") {
            return concat(function(data) {
                done(null, data.toString("utf8"));
            });
        }

        writer = fs.createWriteStream(
            path.resolve(this.opts.cwd, this.opts.output),
            {
                flags    : this.opts.append ? "a" : "w",
                encoding : "utf8"
            }
        );

        writer.on("finish", done);

        return writer;
    },

    run : function(done) {
        var reader = new Kat({
                allowdirs : false
            }),
            writer = this._writeStream(done),
            config = this._loadConfigs(),
            loader, results;

        if(!done || typeof done !== "function") {
            throw new Error("Seeder.run() requires a callback");
        }

        if(config instanceof Error) {
            return done(config);
        }

        loader = new Y.Loader(config);
        loader.require(this.opts.modules);
        results = loader.resolve(true);

        results = results.js.filter(function(file) {
            return !globule.isMatch("node_modules/yui/**", file);
        });

        if(!results.length) {
            return done(new Error("No modules to concat"));
        }

        results.forEach(function(file) {
            reader.add(file);
        });

        reader.pipe(writer);

        reader.on("error",  done);
        writer.on("error",  done);
    }
};

module.exports = Seeder;
