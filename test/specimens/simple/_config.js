var simpleConfig = {
    base : "./",

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
        }
    }
};

if(module) {
    module.exports = simpleConfig;
}
