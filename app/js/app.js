var app = angular.module('myApp', ['ui.router', 'ngAnimate', 'toaster', 'ngSanitize', 'mgcrea.ngStrap', 'oc.lazyLoad'])
    .config(['$ocLazyLoadProvider' ,function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'PostModule',
                files: [
                    'js/post/post.js',
                    'js/post/controllers/PostCtrl.js'
                ]
            }]
        });
    }])
;

app.value('app-version', '0.0.3');
