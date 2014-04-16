angular.module('myApp').controller('HeaderCtrl', function ($scope, $state, User) {
    
    console.log('assigned HeaderCtrl user object');
    $scope.user = User;
    
});