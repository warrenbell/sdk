process.env.PORT = 3000;

// cloud cms server module
var server = require("cloudcms-server/server");

// configure the server
var config = {
    "viewEngine": "jade",
    "auth": {
        "facebook": {
            "enabled": true,
            "callbackUrl": "/auth/facebook/callback",
            "successRedirect": "/",
            "failureRedirect": "/",
            "autoRegister": true,
            "appId": "653450864732491",
            "appSecret": "cb5ab62617cd5f893cd5cc22e9af4698"
        },
        "twitter": {
            "enabled": true,
            "callbackUrl": "/auth/twitter/callback",
            "successRedirect": "/",
            "failureRedirect": "/",
            "autoRegister": true,
            "consumerKey": "4w8HaiTLGtK1deJRGEnItkJal",
            "consumerSecret": "iCMst3zaO2hd9QNlJsG8Ys0aa8PZDU5sr04f43iNhZeP5UWFeQ"
        },
        "linkedin": {
            "enabled": true,
            "callbackUrl": "/auth/linkedin/callback",
            "successRedirect": "/",
            "failureRedirect": "/",
            "autoRegister": true,
            "apiKey": "75ej4yzkby2ak4",
            "apiSecret": "1Mc61SMqm1lQuAwB"
        }
    }
};

// routes
server.routes(function(app, config) {

    // index page
    app.get("/", function(req, res) {

        var facebookProfile = "";
        var hasFacebookProfile = false;
        var twitterProfile = "";
        var hasTwitterProfile = false;
        var linkedinProfile = "";
        var hasLinkedInProfile = false;

        if (req.session.user)
        {
            if (req.session.user.facebookProfile)
            {
                facebookProfile = JSON.stringify(req.session.user.facebookProfile, null, "  ");
                hasFacebookProfile = true;
            }
            if (req.session.user.twitterProfile)
            {
                twitterProfile = JSON.stringify(req.session.user.twitterProfile, null, "  ");
                hasTwitterProfile = true;
            }
            if (req.session.user.linkedinProfile)
            {
                linkedinProfile = JSON.stringify(req.session.user.linkedinProfile, null, "  ");
                hasLinkedInProfile = true;
            }
        }

        res.render('index', {
            title: 'Home Page',
            user: req.session.user,
            facebookProfile: facebookProfile,
            twitterProfile: twitterProfile,
            linkedinProfile: linkedinProfile,
            hasFacebookProfile: hasFacebookProfile,
            hasTwitterProfile: hasTwitterProfile,
            hasLinkedInProfile: hasLinkedInProfile
        });
    });

    // login page
    app.get("/login", function(req, res) {
        res.render('login', {
            title: 'Login Page'
        });
    });

    // logout page
    app.get("/logout", function(req, res) {
        delete req.session.user;
        res.redirect("/");
    });

});

// start the server
server.start(config);
