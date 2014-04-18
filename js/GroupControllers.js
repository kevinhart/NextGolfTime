angular.module('myApp').controller('NewGroupCtrl', function ($scope, $state, $timeout, User, ClientService) {

    console.log("newgroupctrl");


    $scope.checkAvailability = function(){
        //go look in the DB and see if its available
         $scope.searching = true;

        $timeout(function(){
            $scope.searching = false;
        }, 3000);
    }
    
    
});