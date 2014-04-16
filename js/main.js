var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider.state('signin', {
        url: "/signin",
        templateUrl: "partials/signin.html"
    }).state('index', {
        url: "/",
        templateUrl: "partials/overview.html"
    }).state('signout', {
        url: "/signout",
        templateUrl: "partials/signout.html"
    }).state('home', {
        url:"/home",
        templateUrl: "partials/home.html"
    });
});



myApp.factory('MobileServiceClient', function () {
    console.log('creating new azure mobile service client');
    
    return new WindowsAzure.MobileServiceClient(
    "https://nextgolftime.azure-mobile.net/",
    "GpmfHejvmcsPIJBlCeveEJsbqzltwv68");
});


myApp.factory('User', function() {

    var user = {};
    
    user.userName = localStorage.getItem('NGT.userName');
    user.email = localStorage.getItem('NGT.email');
    user.valid = localStorage.getItem('NGT.validSession') === 'true';
    
    user.signIn = function(userName, email){
        localStorage.setItem('NGT.userName', userName);
        localStorage.setItem('NGT.email', email);
        localStorage.setItem('NGT.validSession', 'true');
        
        user.userName = userName;
        user.email = email;
        user.valid = true;
        
    };
    
    user.signOut = function(){
        console.log('sign out');
        localStorage.setItem('NGT.validSession', 'false');
        localStorage.setItem('NGT.userName', '');
        localStorage.setItem('NGT.email', '');
        
        user.userName = '';
        user.email = '';
        user.valid = false;
        
    };
    
    return user;
});

