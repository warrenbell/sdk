var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    if (!br) {
        return waiting(response);
    }
    br.queryNodes({"_type": "guide:city"}).then(function () {
        response.writeHead(200, {"Content-Type": "text/plain"});
        var map = this;
        var keys = map.__keys();
        for (var ii=0; ii<keys.length; ii++) {
            var key = keys[ii];
            var obj = map[key];
            var txt = JSON.stringify(obj);
            response.write(txt + "\n\n\n");
        }
        response.end("\n\nHello World\n\n");
    });
});

server.listen(3000);
console.log("Server running at http://localhost:3000/");




var gitana = require("gitana");


/** the cloudcms application helper */
var platform = null;

/** the cloudcms branch object */
var br = null;

var failed = false, errorMessage;


/**
 * if the server hasn't finished connecting to CloudCMS, tell the user to try again later
 * @param res the express response object
 */
var waiting = function(response) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    if (errorMessage) {
        response.end("Could not connect to Cloud CMS, " +
            "please check your gitana.json configuration file:\n\n" +
            JSON.stringify(errorMessage));
        return;
    }
    response.end("Connecting to CloudCMS ... please wait and retry in a few seconds");
};

/**
 * credentials to be used to connect to cloudcms
 * if null, the file gitana.json in this directory is used instead
 **/
var credential = null;

// Connect to Cloud CMS
//
// By default, this loads config from the gitana.json in the application root.
// Or you can pass in the config as a json object as the first argument
gitana.connect(credential,function(err) {
    // if we were unable to connect, send back an error
    if (err) {
        console.log("error during Gitana.connect: " + JSON.stringify(err));
        errorMessage = err;
        return;
    }
    platform = this;
    platform.datastore("content").readBranch("master")
        .then(function() {
            br = this;
            var msg = JSON.stringify(this);
            console.log(msg);
        });
});




