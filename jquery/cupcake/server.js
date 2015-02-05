var httpProxy = require('http-proxy');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// mount "/proxy" as a proxy to api.cloudcms.com
// we do this to avoid any CORS issues in all browsers
var proxyServer = new httpProxy.createProxyServer({
    "target": "http://api.cloudcms.com",
    "agent": false,
    "xfwd": true
});
var proxyHandler = http.createServer(function(req, res) {
    proxyServer.web(req, res);
}).listeners('request')[0];
app.use("/proxy", function(req, res, next) {
    proxyHandler(req, res);
});

console.log("Web server running on port 3000");
app.listen(3000);