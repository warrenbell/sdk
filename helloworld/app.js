/*

A simple nodejs/express server that demonstrates
  connecting to CloudCMS
  creating nodes
  querying nodes
  deleting nodes

See the README in this directory for instructions on running

 */



var express = require('express');
var path = require('path');
var gitana = require("gitana");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));



/** the cloudcms application helper */
var platform = null;

/** the cloudcms branch object */
var br = null;

/** a common attribute for all nodes that are created to enable easy querying */
var skey = "helloworld";

// some articles relating to programming
var article1 = {
    example: skey,
    title: "hello world",
    body: "hello world is a simple program that demonstrates a roundtrip."
};
var article2 = {
    example: skey,
    title: "foobar",
    body: "foobar is a common placeholder name for a variable."
};
var article3 = {
    example: skey,
    title: "kludge",
    body: "kludge is a word that suggests that a solution is clumsy"
};


// create 3 nodes when the user visits /init
app.get( "/init", function(req, res) {
    if (!br) {
        return waiting(res);
    }

    // is this thread-safe ???
    var num = 0;
    var cb = function() { if (++num==3) res.render('init', {}); }
    br.createNode(article1).then(cb);
    br.createNode(article2).then(cb);
    br.createNode(article3).then(cb);
});

// query all the nodes that have been created
app.get( "/", function(req, res) {
    if (!br) {
        return waiting(res);
    }
    br.queryNodes({example:skey}).then(function () {
        var obj = {map:this};
        res.render('index', obj);
    });
});

// delete the nodes that have been created
app.get( "/teardown", function(req, res) {
    if (!br) {
        return waiting(res);
    }
    br.queryNodes({example:skey}).then(function () {
        var num = this.__size();
        this.del().then(function() {
            res.render('teardown', {num:num});
        });
    });
});

/**
 * if the server hasn't finished connecting to CloudCMS, tell the user to try again later
 * @param res the express response object
 */
var waiting = function(res) {
    res.render('waiting');
};


// Connect to Cloud CMS
//
// By default, this loads config from the gitana.json in the application root.
// Or you can pass in the config as a json object as the first argument
gitana.connect(function(err) {
    // if we were unable to connect, send back an error
    if (err) {
        res.send(500, "Could not connect to Cloud CMS, please check your gitana.json configuration file: " + JSON.stringify(err));
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






// catch 404
app.use(function(req, res, next) {
    res.render('error', {
        message: "Not Found",
        error: {status:404, stack:""}
    });
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


// start a webserver
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});


