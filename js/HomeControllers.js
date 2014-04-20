angular.module('myApp').controller('HomeOverviewCtrl', function ($scope, $state, User, ClientService) {

    //load the upcoming scheduled events
    
    //load the upcoming events not in
    
});





angular.module('myApp').controller('HomeCtrl', function ($scope, $state, User, ClientService) {
    
    //TBD: if not logged in, redirect to sign in
    if(!User.validSession){
        console.log('redirect to sign in - invalid session');
        $state.go('signin');
    }
    
    $scope.user = User;
    
    $scope.groups = [];
    
    if(!User.id){
        console.log('looking up user');
        //we need to figure out if the user profile is complete
        ClientService.getTable('Profile')
            .insert({userName: User.email})
            .done(function (results){
                User.setID(results.id);
        });
    }

    if($state.is('home')){
        //if there are any events, go there
        //else if there are any comments, go there
        //else if there are any groups, go there
        // else new
        if($scope.events && $scope.events.length > 0){
            $state.go("home.schedule");
        }else if($scope.comments && $scope.comments.length > 0){
            $state.go("home.comments");
        }if($scope.groups && $scope.groups.length > 0){
            $state.go("home.groups");
        }else{
            $state.go("home.new");
        }
    }
});