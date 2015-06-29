var app = angular.module('myApp', ['ui.router', 'ngAnimate', 'toaster', 'ngSanitize', 'mgcrea.ngStrap', 'oc.lazyLoad'])
    .config(['$ocLazyLoadProvider' ,function ($ocLazyLoadProvider) {
            
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'PostModule',
                files: [
                    'js/post/PostModule.js',
                    'js/post/controllers/PostIndexCtrl.js',
                    'js/post/controllers/PostViewCtrl.js',
                    'js/post/controllers/PostCreateCtrl.js',
                    'js/post/controllers/PostEditCtrl.js',
                    'js/post/controllers/PostDeleteCtrl.js',
                ]
            },{
                name: 'SiteModule',
                files: [
                    'js/site/SiteModule.js',
                    'js/site/controllers/SiteLoginCtrl.js',
                ]
            }]
        });
        
    }])
;

app.value('app-version', '0.0.1');
