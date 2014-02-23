YUI.add("a", function(){
    console.log("a");
}, "", {
    requires : [
        "b",
        "c"
    ]
});
