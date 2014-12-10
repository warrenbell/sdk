var express = require('express');
var path = require('path');
var gitana = require("gitana");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));



var platform = null;

/** the branch object */
var br = null;

var skey = "helloworld:article";

var create = function(title,body) {
    return {
        stype:skey,
        title:title,
        body:body
    };
};


// some articles relating to programming

var obj1 = create("hello world", "hello is one of the first words that children learn. ");
obj1.body += "hello world is one of the first programs that students of a new language write. ";
obj1.body += "it's a tradition started by kernigan and ritchie in their de facto standard for the c language";
obj1.body += "the nominal purpose of the program is to print 'hello world'.";

var obj2 = create("foobar", "foobar is a common placeholder name for a variable, ");
obj2.body += "suggesting that the variable's purpose is unimportant and exists only to demonstrate a concept.";
obj2.body += "it is often used as a whole, but can be broken into components foo, bar and baz";

var obj3 = create("kludge", "kludge is a word that suggests that a solution is clumsy, ineligant and brittle. ");
obj3.body += "while many eschew such solutions, at many a day has been saved by the versatile engineer ";
obj3.body += "who has been willing to risk public shame and resorted to the crudest of kludges.";



app.get( "/init", function(req, res) {
    if (br==null) return waiting(res);

    // is this thread-safe ???
    var num = 0;
    var cb = function() { if (++num==3) res.render('init', {}); }
    br.createNode(obj1).then(cb);
    br.createNode(obj2).then(cb);
    br.createNode(obj3).then(cb);
});


app.get( "/", function(req, res) {
    if (br==null) return waiting(res);
    br.queryNodes({stype:skey}).then(function () {
        var obj = {map:this};
        res.render('index', obj);
    });
});

app.get( "/teardown", function(req, res) {
    if (br==null) return waiting(res);
    br.queryNodes({stype:skey}).then(function () {
        var num = this.__size();
        this.del().then(function() {
            res.render('teardown', {num:num});
        });
    });
});

app.get( "/restful", function(req, res) {
    if (br==null) return waiting(res);
    br.createNode({stype:skey, "title":"some secret stuff"}).then(function() {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(this));
    });
});

var waiting = function(res) {
    res.render('waiting');
};





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


