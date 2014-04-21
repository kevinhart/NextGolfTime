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
    }
    
    $scope.loading = true;
    $scope.loadGroup();
    
    
    $scope.loadEvents = function(){
        $scope.loadingEvents = true;        
        
        ClientService.getTable('GroupEvent')
            .where({groupID: $scope.groupID })
            .where(function(){
                return this.date >= new Date();
            }).read()
            .then( function(result){
                console.log($scope.events);
                $scope.events = result;
            }, function(err){
                console.log("error loading events: " + err);
            }).then(function(){
                $scope.loadingEvents = false;
                $scope.$apply();
            });
    }
    
    $scope.loadingEvents = true;
    $scope.loadEvents()

    
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
    
});



angular.module('myApp').controller('AddEventCtrl', function ($scope, $modalInstance, User, ClientService, groupID){

    $scope.groupID = groupID;
    
    $scope.minEventDate = new Date();
    $scope.date = new Date();
    
    
    $scope.addEvent = function(){
        
        $scope.processing = true;
            
        ClientService.getTable("GroupEvent")
            .insert({
                groupid: $scope.groupID,
                name: $scope.eventName,
                date: $scope.date,
                description: $scope.description
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
                                   
                                   
                                   
                                   