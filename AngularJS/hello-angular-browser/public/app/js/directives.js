(function () {
angular.module('helloCloudcms')

.directive('gitanaNode', function () {
    return {
        restrict: 'E',
        templateUrl: "app/templates/gitana-node.html"
        // TODO: move some of the logic into this directive.
    };
});

}());
