var express = require('express');
var app = express();

var gitana = require("gitana");

// any request that comes in, we do this
app.get("*", function(req, res) {

    // Connect to Cloud CMS
    //
    // By default, this loads config from the gitana.json in the application root.
    // Or you can pass in the config as a json object as the first argument
    //
    // This is not the most efficient way to do this since we're re-connected on every request.
    // The point here is to demonstrate how this is done.
    //
    gitana.connect(function(err) {

        // if we were unable to connect, send back an error
        if (err) {
            res.send(500, "Could not connect to Cloud CMS, please check your gitana.json configuration file: " + JSON.stringify(err));
            return;
        }

        var platform = this;

        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(platform));

    });
});

// start the Node.js server listening on port 3000
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});