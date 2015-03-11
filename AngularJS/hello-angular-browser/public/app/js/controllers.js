(function () {
    // =================================
    // DECLARATION OF CONTROLLER
    // =================================

    angular.module('helloCloudcms.controllers')
    .controller("NodeListCtrl", function ($scope, cloudcms) {

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
        cloudcms.connect().then(function(holder) {
            var gitana = holder.gitana;

            // "content" is a repository allocated to this Cloud CMS application's stack
            gitana.datastore("content")
            .trap(function(err) {
                // if anything downstream on this chain throws, this trap function will catch it
                // notify the user through a notification.
                self.notification = "Could not connect to CloudCMS: " + err.message;
                $scope.$apply();
                return false;
            })
            .readBranch("master")
            .queryNodes(query).then(function () {
                // nodes
                self.nodes = this.asArray();
                // clear the loading notification
                self.notification = "";
                // update our UI with any changes that were made
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
        $scope.getImageUri = function (node) {
    //        return "/proxy" +  node.getUri() + "/attachments/default";
            return "/proxy" + node.getUri() + "/preview/helloCloudcms_256?mimetype=image/jpeg&size=256&attachment=default";
        };
    });
}());
