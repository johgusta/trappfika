(function () {
    "use strict";

    var trappfika = angular.module('trappfika.controllers', []);

    trappfika.controller('ListCtrl', ['$scope', '$location', 'angularFire', 'firebaseBaseUrl', '$timeout', 'date',
        function ($scope, $location, angularFire, firebaseBaseUrl, $timeout, date) {
            var ref = new Firebase(firebaseBaseUrl + 'contestants');
            angularFire(ref, $scope, 'contestants', []);
            var weeksRef = new Firebase(firebaseBaseUrl + 'weeks');
            angularFire(weeksRef, $scope, 'weeks', []);

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

            $scope.transferToCompletedWeeks = function () {
                var week = new Object();
                week.weekNumber = date.getWeek();
                week.contestants = angular.copy($scope.contestants);
                $scope.weeks.push(week);
                $scope.contestants = {};
                $location.path('/weeks');
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

    trappfika.controller('WeeksCtrl', ['$scope', '$location', 'angularFire', 'firebaseBaseUrl',
        function ($scope, $location, angularFire, firebaseBaseUrl) {
            var ref = new Firebase(firebaseBaseUrl + 'weeks');
            angularFire(ref, $scope, 'weeks', []);
        }]);

    trappfika.controller('HeaderCtrl', ['$scope','date',
        function ($scope, date) {
            $scope.week = date.getWeek();
        }]);

// End of use strict
}());
