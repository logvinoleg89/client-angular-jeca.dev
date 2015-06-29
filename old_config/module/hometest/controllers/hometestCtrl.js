'use strict';
// ci:coverage:exclude

angular.module('app.hometest')
    .controller('HometestCtrl', ['$scope', 'config', 'features', function ($scope, config, features) {

        $scope.env = config.env;
        $scope.features = features;

    }]);

