angular.module('myApp').config([
    '$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider' ,
    function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
        
    var modulesPath = 'js';

    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('!');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: modulesPath + '/site/views/main.html'
        })

        .state('/login', {
            url: '/login',
            templateUrl: modulesPath + '/site/views/login.html',
            controller: 'SiteLogin',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(modulesPath + '/site/controllers/SiteCtrl.js');
                }]
            }
        })

        .state('/post/published', {
            url: '/post/published',
            templateUrl: modulesPath + '/post/views/index.html',
            controller: 'PostIndex',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'PostModule'
                    ]);
                }],
                status: function () {
                    return 2;
                }
            }
        })

        .state('/post/draft', {
            url: '/post/draft',
            templateUrl: modulesPath + '/post/views/index.html',
            controller: 'PostIndex',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(modulesPath + '/post/controllers/PostCtrl.js');
                }],
                status: function () {
                    return 1;
                }
            }
        })

        .state('/post/create', {
            url: '/post/create',
            templateUrl: modulesPath + '/post/views/form.html',
            controller: 'PostCreate'
        })

        .state('/post/:id/edit', {
            url: '/post/:id/edit',
            templateUrl: modulesPath + '/post/views/form.html',
            controller: 'PostEdit',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(modulesPath + '/post/controllers/PostCtrl.js');
                }]
            }
        })

        .state('/post/:id/delete', {
            url: '/post/:id/delete',
            templateUrl: modulesPath + '/post/views/delete.html',
            controller: 'PostDelete',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(modulesPath + '/post/controllers/PostCtrl.js');
                }]
            }
        })

        .state('/post/:id', {
            url: '/post/:id',
            templateUrl: modulesPath + '/post/views/view.html',
            controller: 'PostView',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(modulesPath + '/post/controllers/PostCtrl.js');
                }]
            }
        })

        .state('/404', {
            url: '/404',
            templateUrl: '404.html'
        })
    ;
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
}]);