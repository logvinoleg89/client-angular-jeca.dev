'use strict';

angular.module('app.hometest')
    .config(['featuresResolverProvider', function(featuresResolverProvider) {
        featuresResolverProvider.localFeatures.push('Unit and e2e testing preconfigured');
    }]);
