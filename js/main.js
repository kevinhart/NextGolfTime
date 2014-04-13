var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider.state('signin', {
        url: "/signin",
        templateUrl: "partials/signin.html"
    }).state('home', {
        url: "/home",
        templateUrl: "partials/home.html"
    });
});

