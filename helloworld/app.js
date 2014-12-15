/**
 * Hello World!
 *
 * This is a simple getting-started project that does the following:
 *
 *    a) Connects to Cloud CMS
 *    b) Reads the master branch
 *    c) Queries for content
 *    d) Prints out the resulting JSON
 *
 * See the README.md file for more information.
 */

var http = require('http');
var gitana = require("gitana");

// connect to Cloud CMS
// this looks for gitana.json in local directory
gitana.connect(function(err) {

    if (err) {
        console.log("");
        console.log("There was a problem connecting to Cloud CMS");
        console.log(err);
        process.exit();
    }

    // read the master branch
    this.datastore("content").readBranch("master").queryNodes({
        "_type": "guide:city"
    }).then(function() {
        console.log("");
        console.log(JSON.stringify(this, null, "  "));
        console.log("");
        console.log("You've successfully connected and queried Cloud CMS!");
        console.log("");
    });
});