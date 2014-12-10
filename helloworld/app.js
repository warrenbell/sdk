var express = require('express');
var path = require('path');
var gitana = require("gitana");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));



var platform = null;
var skey = "helloworld";
/** the branch object */
var br = null;

// some articles relating to programming
var obj1 = {
    example: skey,
    title: "hello world",
    body: "hello is one of the first words that children learn."
};
var obj2 = {
    example: skey,
    title: "foobar",
    body: "foobar is a common placeholder name for a variable."
};
var obj3 = {
    example: skey,
    title: "kludge",
    body: "kludge is a word that suggests that a solution is clumsy"
};



app.get( "/init", function(req, res) {
    if (!br) {
        res.render('waiting');
        return;
    }

    // is this thread-safe ???
    var num = 0;
    var cb = function() { if (++num==3) res.render('init', {}); }
    br.createNode(obj1).then(cb);
    br.createNode(obj2).then(cb);
    br.createNode(obj3).then(cb);
});


app.get( "/", function(req, res) {
    if (!br) {
        res.render('waiting');
        return;
    }
    br.queryNodes({example:skey}).then(function () {
        var obj = {map:this};
        res.render('index', obj);
    });
});

app.get( "/teardown", function(req, res) {
    if (!br) {
        res.render('waiting');
        return;
    }
    br.queryNodes({example:skey}).then(function () {
        var num = this.__size();
        this.del().then(function() {
            res.render('teardown', {num:num});
        });
    });
});





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



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});


