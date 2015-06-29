'use strict';
// ci:coverage:exclude

angular.module('app.common')
    .constant('config', {
    "states": {
        "home": {
            "module": "home",
            "path": "/",
            "templateUrl": "home.html",
            "controller": "HomeCtrl",
            "default": true,
            "mixins": [
                "state"
            ],
            "resolve": {
                "features": "featuresResolver"
            }
        }
    },
    "features": [
        "Environment specific configuration",
        "Feature specific configuration",
        "State based routing (UI-Router)",
        "Routing by configuration",
        "Mixins",
        "Resolvers"
    ],
    "env": "dev"
});