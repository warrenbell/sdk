/**
 * Hello World!
 *
 * Starts up a simple Node.js server that:
 *
 *    a) Connects to Cloud CMS
 *    b) Reads the master branch
 *    c) Queries for content
 *
 * See the README.md file for more information.
 */

var http = require('http');
var gitana = require("gitana");

// connect to Cloud CMS
// this looks for gitana.json in local directory
gitana.connect(function(err) {

    console.log("");

    if (err) {
        console.log("There was a problem connecting to Cloud CMS");
        console.log(err);
        process.exit();
    }

    // read the master branch
    this.datastore("content").readBranch("master").then(function () {

        var branch = this;

        // create the node server
        var server = http.createServer(function (request, response) {

            // fetch back at most 5 cities
            Chain(branch).queryNodes({
                "_type": "guide:city"
            }, {
                "limit": 5
            }).then(function () {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(this, null, "  "));
                response.end();
            });

        });

        // listen on port 3000
        server.listen(3000);

        console.log("--------------------------------------------------------");
        console.log("Cloud CMS - Hello World is running");
        console.log("");
        console.log("Open up a browser and point it to:");
        console.log("   http://localhost:3000");
        console.log("");
    });

});