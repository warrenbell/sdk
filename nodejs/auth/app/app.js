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
            "appSecret": "cb5ab62617cd5f893cd5cc22e9af4698",
            "passTicket": true
        },
        "twitter": {
            "enabled": true,
            "callbackUrl": "/auth/twitter/callback",
            "successRedirect": "/",
            "failureRedirect": "/",
            "autoRegister": true,
            "consumerKey": "4w8HaiTLGtK1deJRGEnItkJal",
            "consumerSecret": "iCMst3zaO2hd9QNlJsG8Ys0aa8PZDU5sr04f43iNhZeP5UWFeQ",
            "passTicket": true
        },
        "linkedin": {
            "enabled": true,
            "callbackUrl": "/auth/linkedin/callback",
            "successRedirect": "/",
            "failureRedirect": "/",
            "autoRegister": true,
            "apiKey": "75ej4yzkby2ak4",
            "apiSecret": "1Mc61SMqm1lQuAwB",
            "passTicket": true
        }
    }
};

// routes
server.routes(function(app, config) {

    // index page
    app.get("/", function(req, res) {

        // was ticked handed back
        var ticket = req.param("ticket");
        if (ticket)
        {
            req.session.ticket = ticket;
            res.redirect("/");
            return;
        }

        var facebookProfile = "";
        var hasFacebookProfile = false;
        var twitterProfile = "";
        var hasTwitterProfile = false;
        var linkedInProfile = "";
        var hasLinkedInProfile = false;
        var avatarUrl = "";

        if (req.session.user)
        {
            avatarUrl = "/static/principal/" + req.session.user._doc + "/avatar";

            if (req.session.user.profiles)
            {
                if (req.session.user.profiles.facebook)
                {
                    facebookProfile = JSON.stringify(req.session.user.profiles.facebook, null, "  ");
                    hasFacebookProfile = true;
                }
                if (req.session.user.profiles.twitter)
                {
                    twitterProfile = JSON.stringify(req.session.user.profiles.twitter, null, "  ");
                    hasTwitterProfile = true;
                }
                if (req.session.user.profiles.linkedin)
                {
                    linkedInProfile = JSON.stringify(req.session.user.profiles.linkedin, null, "  ");
                    hasLinkedInProfile = true;
                }
            }
        }

        res.render('index', {
            title: 'Home Page',
            user: req.session.user,
            facebookProfile: facebookProfile,
            twitterProfile: twitterProfile,
            linkedInProfile: linkedInProfile,
            hasFacebookProfile: hasFacebookProfile,
            hasTwitterProfile: hasTwitterProfile,
            hasLinkedInProfile: hasLinkedInProfile,
            ticket: req.session.ticket,
            avatarUrl: avatarUrl
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
        delete req.session.ticket;
        res.redirect("/");
    });

});

// start the server
server.start(config);
