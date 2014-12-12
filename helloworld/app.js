/*

 A simple nodejs server that demonstrates
 connecting to CloudCMS
 using the branch object
 querying nodes

 See the README in this directory for instructions on running

 */




var http = require('http');

var server = http.createServer(function (request, response) {
    if (!br) {
        return waiting(response);
    }
    // query the sample application in cloud cms and list all the cities in the travel guide
    br.queryNodes({"_type": "guide:city"}).then(function () {
        response.writeHead(200, {"Content-Type": "text/plain"});
        // this is a NodeMap comprising several nodes, each of which represents a city
        var map = this;
        var keys = map.__keys();
        for (var ii=0; ii<keys.length; ii++) {
            var key = keys[ii];
            var city = map[key];
            var txt = JSON.stringify(city);

            // write the JSON representation of the city out as plain text
            response.write(txt + "\n\n\n");
        }

        // finish with the canonical "hello world"
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

/** error message returned by Gitana.connect, if any */
var errorMessage;


/**
 * if the server hasn't finished connecting to CloudCMS, tell the user to try again later
 * @param res the express response object
 */
var waiting = function(response) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    if (errorMessage) {
        response.end("Could not connect to Cloud CMS, " +
            "please check your gitana.json configuration file:\n\n" +
            JSON.stringify(errorMessage,true,2));
        return;
    }
    response.end("Connecting to CloudCMS ... please wait and retry in a few seconds");
};


/** an error handler for chaining trap */
var trapper = function(err) {
    errorMessage = err;
    console.log("error: " + JSON.stringify(err));
};


/**
 * credentials to be used to connect to cloudcms
 * if null, the file gitana.json in this directory is used instead
 */
var credentials = null;

// Connect to Cloud CMS
//
// By default, this loads config from the gitana.json in the application root.
// Or you can pass in the config as a json object as the first argument
gitana.connect(credentials,function(err) {
    // if we were unable to connect, send back an error
    if (err) {
        console.log("error during Gitana.connect: " + JSON.stringify(err));
        errorMessage = err;
        return;
    }
    platform = this;
    platform
        .trap(trapper).datastore("content")
        .trap(trapper).readBranch("master")
        .then(function() {
            // save the branch as a global variable so the server can use it
            br = this;
            var msg = JSON.stringify(this);
            console.log(msg);
        });
});




