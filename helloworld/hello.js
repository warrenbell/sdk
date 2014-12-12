/*

the simplest Cloud CMS enabled program
connect to Cloud CMS, query a node and print the result

the output should be a JSON representation of a city

a file named gitana.json must be in the same directory as this file
    see the README for instructions downloading this file
    this file provides credentials to Cloud CMS

for simplicity, this code lacks error handling
    if it fails to print the expected output, see app.js
    which has better diagnostic error messages



 */

var gitana = require("gitana");

/** the cloudcms branch object */
var branch = null;

// Connect to Cloud CMS
//
// By default, this loads config from the gitana.json in the application root.
// Or you can pass in the config as a json object as the first argument
gitana.connect(function(err) {
    // if we were unable to connect, send back an error
    if (err) {
        console.log("error during Gitana.connect: " + JSON.stringify(err));
        return;
    }
    var apphelper = this;
    apphelper.datastore("content")
        .readBranch("master")
        .queryOne({"_type": "guide:city"})
        .then(function () {
            var city = this;
            var txt = JSON.stringify(city,true,2);
            console.log(txt);
            console.log("\n\n you've successfully connected to Cloud CMS and queried content\n\n");
        });
});




