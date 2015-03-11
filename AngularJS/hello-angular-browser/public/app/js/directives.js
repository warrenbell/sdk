(function () {
angular.module('helloCloudcms')

.directive('gtNode', function () {
    return {
        restrict: 'E',
        templateUrl: "app/templates/gitana-node.html"
    };
})
.directive('gtNodeList', ['cloudcms', function (cloudcms) {
    return {
        restrict: 'E',
        scope: {
            // we allow the developer to specify the query that will populate node-list
            // as an attribute of the node-list element
            query:"@query"
        },
        templateUrl: "app/templates/gitana-node-list.html",
        controllerAs:"list",
        controller: function ($scope, cloudcms) {
        // a reference to the scope of the controller for use in callbacks below.
        // (alternatively we could use $scope.)  <-- There's a nuance we're missing here
        var self = this;

        // convert the query that we extract from the element to an object
        // note that with the cloudcms api, you don't have to do this. (try commenting
        // the line below out (You'll also need to
        $scope.query = JSON.parse($scope.query);

        // figure out how to show what query we're loading (only because of the comment above).
        var notificationString = angular.isObject($scope.query) ? $scope.query._type : $scope.query;

        /**
         * a string that will be written to the UI to
         * indicate when things are going well, or poorly.
         *
         */
        this.notification = "Loading " + notificationString + "...";

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
            .queryNodes($scope.query).then(function () {
                // nodes
                self.nodes = this.asArray();
                // clear the loading notification
                self.notification = "";
                // update our UI with any changes that were made
                $scope.$apply();
            });
        });

        /**
         * build and return a uri referencing the default attachment image
         * of the given node.
         * @return String uri
         */
        $scope.getImageUri = function (node) {
    //        return "/proxy" +  node.getUri() + "/attachments/default";
            return "/proxy" + node.getUri() + "/preview/helloCloudcms_256?mimetype=image/jpeg&size=256&attachment=default";
        };
    }
    };
}]);
}());
