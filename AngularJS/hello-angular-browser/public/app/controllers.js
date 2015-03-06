// instantiate this application's module
var helloCloudcms = angular.module("helloCloudcms", []);

// this will hold the promise of a connection to the gitana server.
var gitanaConnected;

// connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored to
// separate credentials from this file. For demo purposes only.
// You should not make credentials available to the browser directly
// in production.
gitanaConnected = Gitana.connect(CONNECTION_CREDENTIALS);

helloCloudcms.controller("StoreCtrl", function ($scope) {
    // a reference to the scope of the controller for use in callbacks below.
    // (alternatively we could use $scope.)
    var self = this;

    /**
     *
     */
    this.cupcakes = [];

    // using the promise we created above, we can chain requests to CloudCMS
    // that should happen asynchronously -- after authentication has (hopefully) succeeded.
    gitanaConnected.then(function () {
        this.readRepository('af4bdc9c1daa4026ff02')
            .readBranch('master')
            .queryNodes({
                "_type":"catalog:product"
                //"_type": {
                    //"$regex":".*catalog"
                //}
        }, function (err) {
            // when the previous promise results in an error,
            // notify the user through a notification.
            self.notification = "Could not connect to CloudCMS: " + err.message;
            $scope.$apply();
        }).each(function () {
            self.cupcakes.push({
                "name":this.get('title'),
                "id":this.get('id'),
                "headline":this.get('headline'),
                "uri": this.getUri(),
                "image":{
                    "icon_64_64":"_preview_default_icon64_64",
                    "default":"default",
                    "_preview_default_upload64_64":""
                },
                "summary":this.get('summary')
            });
        }).then(function () {
            self.notification = "";
            $scope.$apply();
        });
    });
    /**
     * a string that will be written to the UI to
     * indicate when things are going well, or poorly.
     */
    this.notification = "Loading cupcakes...";

    /**
     *
     */
    this.getImageUri = function (cupcake) {
        return "/proxy" +  cupcake.uri + "/attachments/default";
    };
    /**
     *
     */
    this.defaultImageUri = "default";
});
