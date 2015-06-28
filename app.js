var app = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'toaster', 'ngSanitize', 'mgcrea.ngStrap']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider' ,
    function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var modulesPath = 'modules';
    
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('!');

    $stateProvider
        .state('/', {
            url: '',
            templateUrl: modulesPath + '/site/views/main.html'
        })
        .state('post/published', {
            url: '/post/published',
            views: {
                "lazyLoadView": {
                    controller: 'PostIndex', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: modulesPath + '/post/views/index.html'
                }
            },
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('modules/post/controllers/PostCtrl.js');
                }],
                status: function () {
                    return 2;
                }
            }
        })
        .state('post/draft', {
            url: '/post/draft',
            templateUrl: modulesPath + '/post/views/index.html',
            controller: 'PostIndex',
            resolve: {
                status: function () {
                    return 1;
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: modulesPath + '/site/views/login.html',
            controller: 'SiteLogin'
        });
}]);

//app.config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
//    var modulesPath = 'modules';
//
//    $routeProvider
//        .when('/', {
//            templateUrl: modulesPath + '/site/views/main.html'
//        })
//
//        .when('/login', {
//            templateUrl: modulesPath + '/site/views/login.html',
//            controller: 'SiteLogin'
//        })
//
//        .when('/post/published', {
//            templateUrl: modulesPath + '/post/views/index.html',
//            controller: 'PostIndex',
//            resolve: {
//                status: function () {
//                    return 2;
//                }
//            }
//        })
//
//        .when('/post/draft', {
//            templateUrl: modulesPath + '/post/views/index.html',
//            controller: 'PostIndex',
//            resolve: {
//                status: function () {
//                    return 1;
//                }
//            }
//        })
//
//        .when('/post/create', {
//            templateUrl: modulesPath + '/post/views/form.html',
//            controller: 'PostCreate'
//        })
//
//        .when('/post/:id/edit', {
//            templateUrl: modulesPath + '/post/views/form.html',
//            controller: 'PostEdit'
//        })
//
//        .when('/post/:id/delete', {
//            templateUrl: modulesPath + '/post/views/delete.html',
//            controller: 'PostDelete'
//        })
//
//        .when('/post/:id', {
//            templateUrl: modulesPath + '/post/views/view.html',
//            controller: 'PostView'
//        })
//
//        .when('/404', {
//            templateUrl: '404.html'
//        })
//
//        .otherwise({redirectTo: '/404'})
//    ;
//    $locationProvider.html5Mode(true).hashPrefix('!');
//    $httpProvider.interceptors.push('authInterceptor');
//}]);

app.factory('authInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            if ($window.sessionStorage._auth && config.url.substring(0, 4) == 'http') {
                config.params = {'access-token': $window.sessionStorage._auth};
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                $window.setTimeout(function () {
                    $window.location = '/#!/login';
                }, 1000);
            }
            return $q.reject(rejection);
        }
    };
});

app.value('app-version', '0.0.3');

// Need set url REST Api in controller!
app.service('rest', function ($http, $location, $stateParams) {
    return {

//        baseUrl: 'http://yii2-rest-githubjeka.c9.io/rest/web/',
        baseUrl: 'http://rest-jeca.net/rest/web/',
//        baseUrl: 'http://angularjeka.net/rest/web/',
        path: undefined,

        models: function () {
            return $http.get(this.baseUrl + this.path + location.search);
        },

        model: function () {
            if ($stateParams.expand != null) {
                return $http.get(this.baseUrl + this.path + "/" + $stateParams.id + '?expand=' + $stateParams.expand);
            }
            return $http.get(this.baseUrl + this.path + "/" + $stateParams.id);
        },

        get: function () {
            return $http.get(this.baseUrl + this.path);
        },

        postModel: function (model) {
            return $http.post(this.baseUrl + this.path, model);
        },

        putModel: function (model) {
            return $http.put(this.baseUrl + this.path + "/" + $stateParams.id, model);
        },

        deleteModel: function () {
            return $http.delete(this.baseUrl + this.path);
        }
    };

});

app
    .directive('login', ['$http', function ($http) {
        return {
            transclude: true,
            link: function (scope, element, attrs) {
                scope.isGuest = window.sessionStorage._auth == undefined;
            },

            template: '<a href="login" ng-if="isGuest">Login</a>'
        }
    }])
    .filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    });
