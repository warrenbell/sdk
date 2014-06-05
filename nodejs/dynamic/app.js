process.env.PORT = 3000;

// cloud cms server module
var server = require("cloudcms-server/server");

// register some routes
server.routes(function(app) {

    // page handler
    app.get("*.html", function(req, res) {

        var url = req.url;

        var templateId = url;
        if (templateId.indexOf("/") === 0) {
            templateId = templateId.substring(1);
        }
        var i = templateId.indexOf(".html");
        if (i > -1) {
            templateId = templateId.substring(0, i);
        }

        var templateConfig = {
            "title": "Page Title",
            "template": templateId
        };

        res.render("pages/" + templateId + ".html", templateConfig);
    });

});

// start the server
server.start({
    //"socketTransports": ["xhr-polling"]
    "virtualHost": {
        "enabled": false,
        "domain": "cloudcms.net"
    },
    "virtualDriver": {
        "enabled": false
    },
    "wcm": {
        "enabled": false
    },
    "serverTags": {
        "enabled": false
    },
    "perf": {
        "enabled": true
    },
    "welcome": "index.html"

});
