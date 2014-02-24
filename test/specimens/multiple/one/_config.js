var multiConfigOne = {
    groups : {
        one : {
            base : "./one",

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
        }
    }
};

if(module) {
    module.exports = multiConfigOne;
}
