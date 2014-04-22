var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);


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
        templateUrl: "partials/home.html",        
    }).state('home.new', {
        url:"/new",
        templateUrl: "partials/home-new.html"
    }).state('home.overview', {
        url:"/overview",
        templateUrl: "partials/home-overview.html"
    }).state('home.schedule', {
        url:"/schedule",
        templateUrl: "partials/schedule.html"
    }).state('home.comments', {
        url:"/comments",
        templateUrl: "partials/comments.html"
    }).state('home.groups', {
        url:"/groups",
        templateUrl: "partials/home-groups.html"
    }).state('Group', {
        url:"/group/:id",
        templateUrl: "partials/group.html"
    }).state('groups-create-new', {
        url:"/groups/create-new",
        templateUrl: "partials/groups-create-new.html"
//    }).state('event-create-new', {
//        url:"/event/create-new",
//        templateUrl: "partials/addEvent.html"
    });
});



myApp.factory('ClientService', function () {
    console.log('creating new azure mobile service client');
    
    return new WindowsAzure.MobileServiceClient(
    "https://nextgolftime.azure-mobile.net/",
    "GpmfHejvmcsPIJBlCeveEJsbqzltwv68");
    
});


myApp.factory('User', function(ClientService) {

    console.log('new User service');    
    
    var user = {};
    
    user.id = localStorage.getItem('NGT.id');
    user.userName = localStorage.getItem('NGT.userName');
    user.email = localStorage.getItem('NGT.email');
    user.validSession = user.userName && user.userName.length > 0;
    
    if(user.validSession){
        ClientService.currentUser = JSON.parse(localStorage.getItem('NGT.currentUser'));
    }
    
    user.signIn = function(userName, email, id){
        localStorage.setItem('NGT.id', id);
        localStorage.setItem('NGT.userName', userName);
        localStorage.setItem('NGT.email', email);        
        localStorage.setItem('NGT.currentUser', JSON.stringify(ClientService.currentUser));
        
        user.userName = userName;
        user.email = email;
        user.validSession = true;
        
    };
    
    user.signOut = function(){
        
        localStorage.setItem('NGT.id', '');
        localStorage.setItem('NGT.userName', '');
        localStorage.setItem('NGT.email', '');
        localStorage.setItem('NGT.currentUser', '');
        
        ClientService.logout();
        
        user.id = '';
        user.userName = '';
        user.email = '';
        user.validSession = false;
        
    };
    
    user.setID = function(id){
        localStorage.setItem('NGT.id', id);
        user.id = id;
    }
    
    return user;
});



