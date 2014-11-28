angular.module('memo', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ngResource', 'pascalprecht.translate']);

angular.module('memo').config(function($stateProvider, $urlRouterProvider, $translateProvider) {


    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('homepl', {
        url: '/pl',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl'
    });    


    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('en', {
        'QUALITY_1': '0',
        'QUALITY_2': '1000',
        'QUALITY_3': '1100',
        'HEADER': 'Mnemo',
        'ALL_WORDS': 'All words',
        'DEFAULT_WORDS': 'Smart',
        'BEST_WORDS': 'Simple words',
        'INVALID_NUMBER': 'Invalid number',
        'SEARCHING': 'Searching...',
        'TOO_LONG': 'Search takes too long!',
        'HOWTO': 'This page helps with finding representation of number in simplified <a target="_blank" href="http://en.wikipedia.org/wiki/Mnemonic_major_system">mnemonic major system</a>.<br><br>If you want to rememeber any number, type them in the field above and remember shown words.<br>To recall number just replace consonants:<small><br>T, D → 1<br>N → 2<br>M → 3<br>R → 4<br>L → 5<br>J, C → 6<br>K, G → 7<br>F, W, V → 8<br>P, B → 9<br>Z, S → 0</small><br>Omit vowels and other consonants.'
    });   

    $translateProvider.translations('pl', {          
        'QUALITY_1': '0',
        'QUALITY_2': '120',
        'QUALITY_3': '200',
        'HEADER': 'Mnemo',
        'ALL_WORDS': 'Wszystkie słowa',
        'DEFAULT_WORDS': 'Inteligentnie',
        'BEST_WORDS': 'Proste słowa',
        'INVALID_NUMBER': 'Błędny numer',
        'SEARCHING': 'Wyszukiwanie...',
        'TOO_LONG': 'Wyszukiwanie trwa zbyt długo!',
        'HOWTO': 'Strona umożliwia znalezienie wizualizacji liczby korzystając z uproszczonego <a target="_blank" href="http://pl.wikipedia.org/wiki/G%C5%82%C3%B3wny_System_Pami%C4%99ciowy">głównego systemu pamięciowego</a>.<br><br>Jeżeli więc chcesz zapamiętać dowolną liczbę, wpisz ją w wyszukiwarce powyżej i zapamiętaj pokazane słowa.<br>By przypomnieć sobie liczbę po prostu zamień spółgłoski:<small><br>T, D → 1<br>N → 2<br>M → 3<br>R → 4<br>L → 5<br>J, C → 6<br>K, G → 7<br>F, W → 8<br>P, B → 9<br>Z, S → 0</small><br>Samogłoski i pozostałe spółgłoski pomiń.'
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
