var simpleConfig = {
    base : "./",

    aliases : {
        bootstrap : [
            "c",
            "d"
        ]
    },

    modules : {
        "a" : {
            path : "a.js",
            requires : [
                "b",
                "c"
            ]
        },

        "b" : {
            path : "b.js",
            requires : [
                "c"
            ]
        },

        "c" : {
            path : "c.js"
        },

        "d" : {
            path : "d.js"
        }
    }
};

if(module) {
    module.exports = simpleConfig;
}
