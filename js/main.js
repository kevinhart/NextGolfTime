var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "partials/login.html"
    }).state('home', {
        url: "/home",
        templateUrl: "partials/home.html"
    });
});



myApp.factory('MobileServiceClient', function () {
    console.log('creating new azure mobile service client');
    
    return new WindowsAzure.MobileServiceClient(
    "https://nextgolftime.azure-mobile.net/",
    "GpmfHejvmcsPIJBlCeveEJsbqzltwv68");
});

