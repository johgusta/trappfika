/*global angular, Firebase, FirebaseSimpleLogin, console */

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
                var week = {};
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

            $scope.contestant = {name: $scope.user.name,
                                userId: $scope.user.id,
                                up:0,
                                down:0,
                                points:0};

            $scope.save = function () {
                if($scope.user) {
                    $scope.contestants.push($scope.contestant);
                }
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

    trappfika.controller('HeaderCtrl', ['$scope','date', 'firebaseBaseUrl', '$location',
        function ($scope, date, firebaseBaseUrl, $location) {
            $scope.week = date.getWeek();

            var ref = new Firebase(firebaseBaseUrl);
            var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                if (error) {
                    // an error occurred while attempting login
                    console.log(error);
                } else if (user) {
                    // user authenticated with Firebase
                    $scope.user = user;
                    $scope.$apply();
                } else {
                    // user is logged out
                    delete $scope.user;
                    $scope.$apply();
                    $location.path('/');
                }
            });

            $scope.login = function (authenticator) {
                auth.login(authenticator);
            };

            $scope.logout = function () {
                auth.logout();
            };
        }]);

// End of use strict
}());
