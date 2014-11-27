angular.module('memo', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngResource', 'pascalprecht.translate']);

angular.module('memo').config(function($stateProvider, $urlRouterProvider, $translateProvider) {


    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false
    });

    $stateProvider.state('homepl', {
        url: '/pl',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false
    });    


    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('en', {
        'HEADER': 'Mnemo',
        'ALL_WORDS': 'All words',
        'DEFAULT_WORDS': 'Default',
        'BEST_WORDS': 'Simple words',
        'INVALID_NUMBER': 'Invalid number',
        'SEARCHING': 'Searching...',
        'TOO_LONG': 'Search takes too long!',
        'HOWTO': 'Sorry, currently we are supporting only polish language.<br><br>English version will be available soon!'
    });   

    $translateProvider.translations('pl', {
        'HEADER': 'Mnemo',
        'ALL_WORDS': 'Wszystkie słowa',
        'DEFAULT_WORDS': 'Domyślnie',
        'BEST_WORDS': 'Proste słowa',
        'INVALID_NUMBER': 'Błędny numer',
        'SEARCHING': 'Wyszukiwanie...',
        'TOO_LONG': 'Wyszukiwanie trwa zbyt długo!',
        'HOWTO': 'Opis <strong>projektu</strong> :)'
    });   
    
    $translateProvider.preferredLanguage('en');

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
