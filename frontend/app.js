angular.module('memo', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngResource']);

angular.module('memo').config(function($stateProvider, $urlRouterProvider) {


    $stateProvider.state('home', {
        url: '',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false
    });


    /* Add New States Above */
    $urlRouterProvider.otherwise('');

});

angular.module('memo').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
