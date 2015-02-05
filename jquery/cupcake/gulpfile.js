var gulp = require("gulp");
var nodemon = require("nodemon");

// Starts a server w/ nodemon and runs gulp watch
gulp.task("default", function() {
    nodemon({
        script: "server.js",
        ext:    "js",
        ignore: [
            "*/**",
            "*",
            "*.*"
        ]
    });
});
