angular.module('myApp').controller('SignOutCtrl', function ($scope, User) {

    console.log('sign out');
    User.signOut();    
});