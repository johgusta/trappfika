/*global angular, Firebase */

(function () {
    "use strict";

    var trappfika = angular.module('trappfika', ['ngRoute', 'firebase']);

    trappfika.value('firebaseBaseUrl', 'https://trappfika.firebaseio.com/');

    trappfika.config(function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl : 'list.html'}).
            when('/new', {controller : 'CreateCtrl', templateUrl : 'detail.html'}).
            when('/rules', {controller : 'RulesCtrl', templateUrl : 'rules.html'}).
            when('/superSecretAddRulesUrl', {controller : 'RulesCtrl', templateUrl : 'addRule.html'}).
            otherwise({redirectTo : '/'});
    });

    trappfika.controller('ListCtrl', ['$scope', 'angularFire', 'firebaseBaseUrl', '$timeout',
        function ($scope, angularFire, firebaseBaseUrl, $timeout) {
            var ref = new Firebase(firebaseBaseUrl + 'contestants');
            angularFire(ref, $scope, 'contestants', []);
            $scope.origCopys = {};

            function equalPoints(orig, current) {
                return (orig.up === current.up && orig.down === current.down);
            }

            function flashColor(contestant) {
                contestant.updated = true;
                $timeout(function () {
                    contestant.updated = false;
                }, 500);
            }

            function updatePoints(orig, updated) {
                if (!equalPoints(orig, updated)) {
                    updated.points = parseInt(updated.up, 10) * 2 + parseInt(updated.down, 10);
                    flashColor(updated);
                }
            }

            $scope.enter = function (contestant) {
                $scope.origCopys[contestant.name] = angular.copy(contestant);
            };

            $scope.leave = function (contestant) {
                updatePoints($scope.origCopys[contestant.name], contestant);
                delete $scope.origCopys[contestant.name];
            };

            $scope.addUp = function (contestant) {
                contestant.up = parseInt(contestant.up, 10) + 1;
            };

            $scope.addDown = function (contestant) {
                contestant.down = parseInt(contestant.down, 10) + 1;
            };

            $scope.subtractUp = function (contestant) {
                contestant.up = parseInt(contestant.up, 10) - 1;
            };

            $scope.subtractDown = function (contestant) {
                contestant.down = parseInt(contestant.down, 10) - 1;
            };
        }]);

    trappfika.controller('CreateCtrl', ['$scope', '$location', 'angularFire', 'firebaseBaseUrl',
        function ($scope, $location, angularFire, firebaseBaseUrl) {
            var ref = new Firebase(firebaseBaseUrl + 'contestants');
            angularFire(ref, $scope, 'contestants', []);

            function points(contestant) {
                return parseInt(contestant.up, 10) * 2 + parseInt(contestant.down, 10);
            }

            $scope.save = function () {
                $scope.contestant.points = points($scope.contestant);
                $scope.contestants.push($scope.contestant);
                $location.path('/');
            };
        }]);

    trappfika.controller('RulesCtrl', ['$scope', '$location', 'angularFire', 'firebaseBaseUrl',
        function ($scope, $location, angularFire, firebaseBaseUrl) {
            var ref = new Firebase(firebaseBaseUrl + 'rules');
            angularFire(ref, $scope, 'rules', []);

            $scope.addRule = function () {
                $scope.rules.push($scope.rule);
            };
        }]);

// End of use strict
}());
