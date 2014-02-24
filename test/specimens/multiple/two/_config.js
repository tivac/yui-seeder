var multiConfigTwo = {
    groups : {
        two : {
            base : "./two",

            modules : {
                "d" : {
                    path : "d.js",
                    requires : [
                        "e",
                        "f"
                    ]
                },

                "e" : {
                    path : "e.js",
                    requires : [
                        "c"
                    ]
                },

                "f" : {
                    path : "f.js"
                }
            }
        }
    }
};

if(module) {
    module.exports = multiConfigTwo;
}
