angular.module('helloCloudcms')

.directive('gitanaNode', function () {
    return {
        restrict: 'E',
        templateUrl: "app/templates/gitana-node.html"
    };
});
