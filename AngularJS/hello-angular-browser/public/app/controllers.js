// instantiate this application's module
var helloCloudcms = angular.module("helloCloudcms", []);

// this will hold the promise of a connection to the gitana server.
var gitanaConnected;

// connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored to
// separate credentials from this file (./public/GITANA_CREDENTIALS.js). For demo purposes only.
// You should not make credentials available to the browser directly
// in production.
gitanaConnected = Gitana.connect(CONNECTION_CREDENTIALS);

helloCloudcms.controller("StoreCtrl", function ($scope) {
    // a reference to the scope of the controller for use in callbacks below.
    // (alternatively we could use $scope.)
    var self = this;
    var query = {"_type":"catalog:product"};
    /**
     * a collection of nodes that we will load from the server and show
     */
    this.nodes = [];

    // using the promise we created above, we can chain requests to CloudCMS
    // that should happen asynchronously -- after authentication has (hopefully) succeeded.
    gitanaConnected.then(function () {
        // REPOSITORY is a global stored in ./public/GITANA_CREDENTIALS.js.  Add a reference to your repository.
        // TODO: change this to a string reference?  e.g. 'content' like datastore('content') or something similar?
        this.readRepository(REPOSITORY)
            .readBranch("master")
            .queryNodes(query).then(function () {/*no-op.  Nothing to intercept if we succeed.*/},
               function (err) {
            // when the previous promise results in an error,
            // notify the user through a notification.
            // XXX this doesn't seem to work.
            self.notification = "Could not connect to CloudCMS: " + err.message;
            $scope.$apply();
        }).each(function () {
            // TODO refactor the building of this object to build
            // its exposed nodes through reflection.
            self.nodes.push({
                "name":this.get("title"),
                "id":this.get("id"),
                "headline":this.get("headline"),
                "uri": this.getUri(),
                "summary":this.get("summary")
            });
        }).then(function () {
            // clear the loading notification
            self.notification = "";
            $scope.$apply();
        });
    });
    /**
     * a string that will be written to the UI to
     * indicate when things are going well, or poorly.
     *
     */
    this.notification = "Loading " + query._type + "...";

    /**
     * build and return a uri referencing the default attachment image
     * of the given node.
     * @return String uri
     */
    this.getImageUri = function (node) {
        return "/proxy" +  node.uri + "/attachments/default";
    };
});
