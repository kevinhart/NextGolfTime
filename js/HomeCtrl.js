angular.module('myApp').controller('HomeCtrl', function ($scope, $state, User, ClientService) {
    
    //TBD: if not logged in, redirect to sign in
    if(!User.validSession){
        $state.go('signin');
    }
    
    $scope.user = User;
    
    //we need to figure out if the user profile is complete
    ClientService.getTable('Profile')
        .insert({userName: User.email})
        .done(function (results){
            console.log(results);
    });


    
});