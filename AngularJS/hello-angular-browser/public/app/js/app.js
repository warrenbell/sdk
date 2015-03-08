// =================================
// INITIALIZE CONENCTION TO CLOUDCMS
// =================================

// this will hold the promise of a connection to the gitana server.
var gitanaConnected;

// connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored to
// separate credentials from this file (./public/GITANA_CREDENTIALS.js). For demo purposes only.
// You should not make credentials available to the browser directly
// in production.
gitanaConnected = Gitana.connect(CONNECTION_CREDENTIALS).then(
    function () {
        // no-op we don't need to warn the user about correct operation.
    },
    function (err) {
        var errorPrefix = "Failed to connect to CloudCMS:";
        this.notification = errorPrefix + err.toString();
        console.log('error');
});


// =================================
// INITIALIZE ANGULAR APPLICATION
// =================================

// instantiate this application's module
angular.module("helloCloudcms", ['helloCloudcms.controllers'])
    .value('gitanaConnected', gitanaConnected);

// Controllers module
angular.module('helloCloudcms.controllers', []);

