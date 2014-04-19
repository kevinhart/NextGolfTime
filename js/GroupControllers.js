angular.module('myApp').controller('NewGroupCtrl', function ($scope, $state, $timeout, User, ClientService) {
    


    $scope.createGroup = function(isValid){
        //go look in the DB and see if its available
         $scope.searching = true;

        $timeout(function(){
            $scope.searching = false;
                    if(isValid){
            alert("TBD - INSERT INTO DB");
        }
        }, 3000);
        

    }
    
});