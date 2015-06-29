angular.module('myApp').directive('login', ['$http', function ($http) {
    return {
        transclude: true,
        link: function (scope, element, attrs) {
            scope.isGuest = window.sessionStorage._auth == undefined;
        },

        template: '<a href="login" ng-if="isGuest">Login</a>'
    };
}]);