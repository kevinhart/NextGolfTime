angular.module('myApp').controller('SignInCtrl', function ($scope, $state, $stateParams, $location, MobileServiceClient, User) {
  
    
   /* $scope.loadData = function(){
        MobileServiceClient.getTable('Group')
        .read()
        .then(function(items){
              console.log(items);
              $scope.groups = items;
          }).done(function(results){
            console.log(results);
            $scope.$apply();
        });
    };*/
    
    $scope.login = function(vendor){
        if (vendor != 'google'){
            window.alert("sorry, not supported yet.  try google");
            return;
        }
        console.log("login function");
        MobileServiceClient.login(vendor).then(function(){
            
        }).done(function()
                {                    
                    MobileServiceClient
                        .invokeApi('userInfo', { method: "GET"})
                        .done(function(results){                             
                             var retData = JSON.parse(results.response);
                             User.signIn(retData.name, retData.email);
                            $scope.$apply();
                            $state.go('home');
                         });
                });
    }
    
});
