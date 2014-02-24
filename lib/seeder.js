/*jshint node:true */
"use strict";

var fs = require("fs"),

    _       = {
        merge : require("lodash.merge")
    },
    Y       = require("yui/loader"),
    Kat     = require("kat"),
    concat  = require("concat-stream"),
    globule = require("globule"),

    Seeder;

Seeder = function(argv) {
    this.cwd      = argv.cwd || process.cwd();
    this.configs  = argv.config;
    this.module   = argv.module;
    this.append   = argv.append;
    this.output   = argv.output;
};

Seeder.prototype = {
    _loadConfigs : function() {
        var configs = this.configs.map(function(config) {
            return require(config);
        });
        
        return _.merge.apply(_, configs);
    },

    _writeStream : function(done) {
        var writer;

        if(this.output === "stdout") {
            return concat({
                encoding : "string"
            }, function(data) {
                done(null, data);
            });
        }

        writer = fs.createWriteStream(this.output, {
            flags : this.append ? "a" : "w"
        });

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

        if(!config) {
            return done("Unable to find config using " + this.config);
        }

        loader = new Y.Loader(require(config));
        loader.require(this.module);
        results = loader.resolve(true);

        results = results.js.filter(function(file) {
            return !globule.isMatch("node_modules/yui/**", file);
        });

        if(!results.length) {
            return done("No modules to concat");
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
