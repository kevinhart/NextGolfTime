angular.module('myApp').controller('ScheduleCtrl', function ($scope, $state, User, ClientService) {
    
    $scope.user = User;
     
    
});





angular.module('myApp').controller('HomeCtrl', function ($scope, $state, User, ClientService) {
    
    //TBD: if not logged in, redirect to sign in
    if(!User.validSession){
        console.log('redirect to sign in - invalid session');
        $state.go('signin');
    }
    
    $scope.user = User;

    //load the upcoming scheduled events
    $scope.loadEvents = function(){
        $scope.loadingEvents = true;
        ClientService.invokeApi('api_eventmembers',{
                    method: 'get',
                    parameters: { userID: User.id }
                })                
                .then( function(result){
                    $scope.events = result.result;                    
                }, function(err){
                    console.log("error loading events: " + err);
                }).then(function(){
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
                $scope.groups = result.result;
            }, function(err){
                console.log("error loading groups affiliated: " + err);
            }).then( function(){                
                $scope.loadingGroups = false;
                $scope.$apply();
            });
    };
    
    $scope.loadGroups();
    
    if(!User.id){
        //we need to figure out if the user profile is complete
        ClientService.getTable('Profile')
            .insert({userName: User.email})
            .done(function (results){
                User.setID(results.id);
        });
    }

    
    
    $scope.findEvent = function (eventID){
        for(var i = 0; i < $scope.events.length; i++){
            if($scope.events[i].EventID === eventID){
                return $scope.events[i];
            }
        }
    };
    
    $scope.addEvent = function(userID, eventID){
        ClientService.getTable('EventMember')
            .insert({eventID: eventID, profileID: userID})
            .done(function (result){
                //update the event
                var e = $scope.findEvent(eventID);
                e.SignedUp = 1;
                e.EventMemberID = result.id;
                $scope.$apply();
            });
    };
    
    
    $scope.leaveEvent = function(eventInstanceID, eventID){
        ClientService.getTable('EventMember')
            .del({id:eventInstanceID})
            .done(function (result){
                var e = $scope.findEvent(eventID);
                e.SignedUp = 0;
                e.EventMemberID = null;
                $scope.$apply();
            });
    };
    
    
    if($state.is('home')){
        console.log("where to go from state: home");
        
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








angular.module('myApp').controller('HomeGroupCtrl', function ($scope, $state, User, ClientService) {

    $scope.searching = "false";
    $scope.search = {};
    
    $scope.groupSearch = function (txt){
      
        $scope.searching = true;
        
        ClientService.getTable('Group')
            .where( function(name){
                //can't let people search private groups
               return this.name.indexOf(name) >= 0 && this.privacylevel < 3
            }, txt)
            .read()
            .then( function(result){
                $scope.search.results = result;
            }, function(err){
                console.log("error searching groups: " + err);
            }).then( function(){
                $scope.searching = false;
                $scope.$apply();
            });
        
    };

});


