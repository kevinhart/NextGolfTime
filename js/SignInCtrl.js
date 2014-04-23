angular.module('myApp').controller('SignInCtrl', function ($scope, $state, $stateParams, $location, ClientService, User) {
  
    
    $scope.login = function(vendor){
        if (vendor != 'google'){
            window.alert("sorry, not supported yet.  try google");
            return;
        }
        console.log("login function");
        ClientService.login(vendor).then(function(){
            
        }).done(function()
                {                    
                    ClientService
                        .invokeApi('userInfo', { method: "GET"})
                        .done(function(results){                             
                             var retData = results.result;
                             User.signIn(retData.name, retData.email, '');                            
                            $state.go('home');
                         });
                });
    }
    
});
