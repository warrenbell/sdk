process.env.PORT = 3000;

// cloud cms server module
var server = require("cloudcms-server/server");

// configure the server
var config = {
    "virtualHost": {
        "enabled": false
    },
    "wcm": {
        "enabled": false
    },
    "serverTags": {
        "enabled": false
    },
    "insight": {
        "enabled": false
    },
    "perf": {
        "enabled": false
    },
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

// start the server
server.start(config);
