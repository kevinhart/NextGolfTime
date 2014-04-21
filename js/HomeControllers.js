angular.module('myApp').controller('HomeOverviewCtrl', function ($scope, $state, User, ClientService) {
    
    
    //$scope.loading = true;
    
    $scope.loadingPossible = false;
    
    //load the upcoming scheduled events
    $scope.loadEvents = function(){
        console.log('loading events');
        $scope.loadingEvents = true;
        ClientService.getTable('GroupEvent')
                //.where({ownerID: User.id })
                .read()
                .then( function(result){
                    console.log(result);
                    $scope.events = result;
                }, function(err){
                    console.log("error loading events: " + err);
                }).then(function(){
                    console.log('done loading events');
                    $scope.loadingEvents = false;
                    $scope.$apply();
                });
    };
    $scope.loadEvents();
    
    //load the upcoming events not in
    
    //load the groups
    $scope.loadGroups = function(){
        $scope.loadingGroups = true;
        ClientService.invokeApi('apigroupsaffiliated', 
                                {
                                    method: 'GET',
                                    parameters: { userID: User.id }
                                })
            .then( function(result){                
                $scope.groups = JSON.parse(result.response);
                console.log($scope.groups);
            }, function(err){
                console.log("error loading groups affiliated: " + err);
            }).then( function(){
                console.log('done loading groups');
                $scope.loadingGroups = false;
                $scope.$apply();
            });
    };
    
    $scope.loadGroups();
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