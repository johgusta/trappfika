
var myapp = angular.module('trappfika', ['ngRoute', 'firebase']).
    config(function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl:'list.html'}).
        when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
        when('/rules', {controller:RulesCtrl, templateUrl:'rules.html'}).
        otherwise({redirectTo:'/'});
});

myapp.controller('MyCtrl', ['$scope', 'angularFire',
    function MyCtrl($scope, angularFire, fbURL) {
        var ref = new Firebase('https://trappfika.firebaseio.com/contestants');
        angularFire(ref, $scope, 'contestants', []);


        function calcPoints(contestant) {
            contestant.points = parseInt(contestant.up) * 2 + parseInt(contestant.down);
        }

        $scope.addUp = function(contestant) {
            contestant.up = parseInt(contestant.up) + 1;
            calcPoints(contestant);
        }

        $scope.addDown = function(contestant) {
            contestant.down = parseInt(contestant.down) + 1;
            calcPoints(contestant);
        }

        $scope.subtractUp = function(contestant) {
            contestant.up = parseInt(contestant.up) - 1;
            calcPoints(contestant);
        }

        $scope.subtractDown = function(contestant) {
            contestant.down = parseInt(contestant.down) - 1;
            calcPoints(contestant);
        }
    }
]);

function CreateCtrl($scope, $location, angularFire) {
    var ref = new Firebase('https://trappfika.firebaseio.com/contestants');
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

function RulesCtrl($scope, $location, angularFire) {
    var ref = new Firebase('https://trappfika.firebaseio.com/rules');
    angularFire(ref, $scope, 'rules', []);

}
