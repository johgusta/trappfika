
var trappfika = angular.module('trappfika', ['ngRoute', 'firebase']);
trappfika.value('firebaseUrl', 'https://trappfika.firebaseio.com/contestants');
trappfika.config(function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl:'list.html'}).
        when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
        otherwise({redirectTo:'/'});
});

trappfika.controller('ListCtrl', ['$scope', 'angularFire', 'firebaseUrl', '$timeout',
    function($scope, angularFire, firebaseUrl, $timeout) {
        var ref = new Firebase(firebaseUrl);
        angularFire(ref, $scope, 'contestants', []);
        $scope.origCopys = {};

        function updatePoints(orig, updated) {
            if(!equalPoints(orig, updated)) {
                updated.points = parseInt(updated.up) * 2 + parseInt(updated.down);
                flashColor(updated);
            }
        }

        function equalPoints(orig, current) {
            return (orig.up == current.up && orig.down == current.down);
        }

        function flashColor(contestant) {
            contestant.updated = true;
            $timeout(function() {
                contestant.updated = false;
            }, 500);
        }

        $scope.enter = function(contestant) {
            $scope.origCopys[contestant.name] = angular.copy(contestant);
        }

        $scope.leave = function(contestant) {
            updatePoints($scope.origCopys[contestant.name], contestant);
            delete $scope.origCopys[contestant.name];
        }

        $scope.addUp = function(contestant) {
            contestant.up = parseInt(contestant.up) + 1;
        }

        $scope.addDown = function(contestant) {
            contestant.down = parseInt(contestant.down) + 1;
        }

        $scope.subtractUp = function(contestant) {
            contestant.up = parseInt(contestant.up) - 1;
        }

        $scope.subtractDown = function(contestant) {
            contestant.down = parseInt(contestant.down) - 1;
        }
    }
]);

function CreateCtrl($scope, $location, angularFire, firebaseUrl) {
    var ref = new Firebase(firebaseUrl);
    angularFire(ref, $scope, 'contestants', []);

    $scope.save = function() {
        $scope.contestant.points = points($scope.contestant);
        $scope.contestants.push($scope.contestant);
        $location.path('/');
    }

    function points(contestant) {
        return parseInt(contestant.up) * 2 + parseInt(contestant.down);
    }
}
