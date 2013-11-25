/*global angular, Firebase */

(function () {
    "use strict";

    var trappfika = angular.module('trappfika', ['trappfika.services', 'trappfika.controllers', 'ngRoute', 'firebase']);

    trappfika.value('firebaseBaseUrl', 'https://trappfika.firebaseio.com/');

    trappfika.config(function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl : 'list.html'}).
            when('/new', {controller : 'CreateCtrl', templateUrl : 'detail.html'}).
            when('/rules', {controller : 'RulesCtrl', templateUrl : 'rules.html'}).
            when('/weeks', {controller : 'WeeksCtrl', templateUrl : 'weeks.html'}).
            when('/superSecretAddRulesUrl', {controller : 'RulesCtrl', templateUrl : 'addRule.html'}).
            otherwise({redirectTo : '/'});
    });


// End of use strict
}());
