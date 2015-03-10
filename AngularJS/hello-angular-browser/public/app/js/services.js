(function () {

    angular.module('helloCloudcms.services').service("cloudcms", function($log, $q) {
       
        // =================================
        // INITIALIZE CONNECTION TO CLOUDCMS
        // =================================
        
        var service = {};
        service.connect = function() {
                
            var deferred = $q.defer();

            // connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored to
            // separate credentials from this file (./public/GITANA_CREDENTIALS.js). For demo purposes only.
            // You should not make credentials available to the browser directly
            // in production.
            Gitana.connect(CONNECTION_CREDENTIALS, function(err) {

                if (err) {
                    //var errorPrefix = "Failed to connect to CloudCMS:";
                    //this.notification = errorPrefix + err.toString();
                    $log.warn("Failed to connect to Cloud CMS: " + err);
                    deferred.reject();
                    return;
                }

                // TODO: for some reason, Angular does not like it when we do deferred.resolve(this)?
                // TODO: the promise.then gets null as an argument...?  so wrap into an object... (hack)
                deferred.resolve({
                    gitana: this
                });
            });

            return deferred.promise;
        };
        
        return service;        
    });

}());
