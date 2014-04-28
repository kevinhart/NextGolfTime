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
    }).state('Event', {
        url:"/event/:id",
        templateUrl: "partials/event.html"
    }).state('groups-create-new', {
        url:"/groups/create-new",
        templateUrl: "partials/groups-create-new.html"
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



angular.module('myApp').controller('LandingPageCtrl', function ($scope, $location, $anchorScroll) {
    
    $scope.goToID = function(id){
        $location.hash(id);
        $anchorScroll();
    };
    
});


angular.module('ng').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' ...');
        };
    });


myApp.directive('calendarEvent', function(){
   return{
       restrict: 'E',
       replace: 'true',
       templateUrl: 'partials/calendarEvent.html',
       scope: {
            month: '@',
            day: '@',
            weekday: '@',
            time: '@',
            name: '@',
            location: '@',
            group: '@',
           toggleText: '@',
           onToggle: '&',
           onView: '&',
           userID: '@',
           eventID: '@'
       },
        link: function(scope, elem, attrs){
            scope.toggle = function(){
                scope.onToggle(scope.userID, scope.eventID);
            };
            
            scope.viewEvent = function(){
                console.log("on view");
                scope.onView(scope.eventID);
            }
        }
   };
});