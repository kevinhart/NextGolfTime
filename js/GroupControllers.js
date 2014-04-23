angular.module('myApp').controller('NewGroupCtrl', function ($scope, $state, $timeout, User, ClientService) {
    
    $scope.loading = false;
    $scope.privacy = 2; //semi-private
    
    $scope.createGroup = function(isValid){
        //go look in the DB and see if its available
        $scope.loading = true;

        ClientService.getTable("Group")
            .insert({ name: $scope.groupName, description: $scope.description, ownerid: User.id, privacylevel: $scope.privacy})
            .then(function(result){
                console.log(JSON.stringify(result));
                $state.go('Group', {id: result.id});                
            }, function (err){
                console.log("error inserting group: " + err);
               $scope.insertError = err;                 
            }).then( function(){
                $scope.loading = false;
            });
        

    }
    
});


angular.module('myApp').controller('GroupCtrl', function ($scope, $stateParams, $state, $modal, User, ClientService){
   
    $scope.groupID = $stateParams.id;
    $scope.user = User;
    
    $scope.loadGroup = function(){        
        $scope.loading = true;
        
        ClientService.getTable('Group')
            .lookup($scope.groupID)        
            .then(function(result){            
                $scope.group = result;  
            }, function(err){
                console.log("error getting group id: " + id + "  error: " + err);
            }).then(function(){            
                $scope.loading = false;
                $scope.$apply();
            });
    
        $scope.loadingMemberInfo = true;
        ClientService.getTable('GroupMember')
            .where( { memberProfileID: $scope.user.id, groupID: $scope.groupID })
            .read()
            .then( function(result){                
                $scope.memberInfo = result[0];
                console.log($scope.memberInfo);
            }, function(err){
                console.log("error looking for group member: " + err);
            }).then( function(){
                $scope.loadingMemberInfo = false;
                $scope.$apply();
            });
    
    }
    
    $scope.loading = true;
    $scope.loadGroup();
    
    
    $scope.loadEvents = function(){
        $scope.loadingEvents = true;                
        ClientService.getTable('GroupEvent')
            .where({groupID: $scope.groupID })
//            .where(function(){
//                return this.date >= new Date();
//            })
            .read()
            .then( function(result){                
                $scope.events = result;
                console.log($scope.events);
            }, function(err){
                console.log("error loading events: " + err);
            }).then(function(){
                $scope.loadingEvents = false;
                $scope.$apply();
            });
    }
    
    $scope.loadingEvents = true;
    $scope.loadEvents();

    $scope.loadMembers = function(){
         $scope.loadingMembers = true;                
        ClientService.invokeApi('api_groupmembers', {
                                    method: 'GET',
                                    parameters: { groupID: $scope.groupID }
                                })
            .then( function(result){                
                $scope.members = result.result;     
                console.log(result);
            }, function(err){
                console.log("error loading members: " + err);
            }).then(function(){
                $scope.loadingMembers = false;
                $scope.$apply();
            });
    };
    
    $scope.loadMembers();
    
    
    $scope.addEvent = function(){
        var modalInstance = $modal.open({
            templateUrl: 'partials/addEvent.html',
            controller: 'AddEventCtrl',
            resolve: {
                groupID: function(){
                    return $scope.groupID;
                }
            }
        });
        
        modalInstance.result.then(function(){
           $scope.loadEvents(); 
        });
    };
    
    $scope.joinGroup = function( userID, groupID){
        $scope.joiningGroup = true;
        ClientService.getTable('GroupMember')
            .insert({
                groupID: groupID,
                memberProfileID: userID
            }).then(function(result){
                $scope.memberInfo = result;                
            }, function(err){
                console.log("error joining group: " + err);
            }).then(function(){
                $scope.joiningGroup = false;
                $scope.$apply();
            });
    };
    
     $scope.leaveGroup = function( id ){
        $scope.leavingGroup = true;
        ClientService.getTable('GroupMember')
            .del({
                id: id
            }).then(function(result){
                $scope.memberInfo = null;                
            }, function(err){
                console.log("error leaving group: " + err);
            }).then(function(){
                $scope.leavingGroup = false;
                $scope.$apply();
            });
    };
    
});



angular.module('myApp').controller('AddEventCtrl', function ($scope, $modalInstance, User, ClientService, groupID){

    $scope.minEventDate = new Date();
    $scope.event = {
        groupID: groupID,
        date: new Date()
    };
        
    
    $scope.addEvent = function(){
        
        $scope.processing = true;
        ClientService.getTable("GroupEvent")
            .insert({
                groupid: $scope.event.groupID,
                name: $scope.event.name,
                date: $scope.event.date,
                description: $scope.event.description
            }).then(function(result){
                console.log(result);
                $modalInstance.close();
            }, function(err){
                console.log("error adding event: " + err);
        }).then(function(){
           $scope.processing = false;
            $scope.$apply();
        });
        
            
    };

});
                                   
                                   
                                   
                                   