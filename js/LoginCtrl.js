angular.module('myApp').controller('LoginCtrl', function ($scope, $stateParams, $location, MobileServiceClient) {
  
    
    $scope.loadData = function(){
        MobileServiceClient.getTable('Group')
        .read()
        .then(function(items){
              console.log(items);
              $scope.groups = items;
          }).done(function(results){
            console.log(results);
            $scope.$apply();
        });
    };
    
    $scope.login = function(vendor){
        console.log("login function");
        MobileServiceClient.login(vendor).then(function(){
            console.log("client login - then");
        }).done(function()
                {
                    console.log("client login - done");
                    $scope.loadData();
                    $scope.currentUser = MobileServiceClient.currentUser;
                    console.log(MobileServiceClient);
                });
    }
    
});