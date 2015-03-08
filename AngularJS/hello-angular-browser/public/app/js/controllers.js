(function () {
// =================================
// DECLARATION OF CONTROLLER
// =================================

angular.module('helloCloudcms.controllers')
.controller("NodeListCtrl", function ($scope, gitanaConnected) {
    // a reference to the scope of the controller for use in callbacks below.
    // (alternatively we could use $scope.)
    var self = this;
    var query = {"_type":"catalog:product"};
    /**
     * a collection of nodes that we will load from the server and show
     */
    this.nodes = [];

    // using the promise we created just before we declared our app, we can chain requests to CloudCMS
    // that happen asynchronously -- after authentication has (hopefully) succeeded.
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
        }, function (err) {
            // if the query we fire fails for some reason, notify the user.
            var errorPrefix = "Failed to load " + query + ":";
            this.notification = errorPrefix + err.toString();
            console.error(errorMsg, err);
        }).then(function () {
            // regardless of success or failure, we want to update our UI with any changes that were made
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
}());
