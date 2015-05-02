var proxyPath = '/proxy';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  var proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request

    // NOTE: we had to remove this from the
    // auto generated proxy in order to get
    // to connect co cloudcms.

    //req.url = proxyPath + '/' + req.url;
    proxy.web(req, res, {
        target: 'http://api.cloudcms.com'
    });
    // set the timeout to never happen.
    res.connection.setTimeout(0);
  });
};
