var app = angular.module("ngMaps", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    'use strict';
    
    $routeProvider.when("/home", {templateUrl: "partials/home.html", controller: "HomeController"});
    $routeProvider.when("/map", {templateUrl: "partials/map.html", controller: "MapController"});
    $routeProvider.otherwise({redirectTo: "/home"});
}]);

app.controller("HomeController", ["$scope", "$location", function ($scope, $location) {
    'use strict';
    
    $scope.showMap = function () {
        $location.path("/map");
    };
    
}]);


app.controller("MapController", ["$scope", function ($scope) {
    'use strict';
    
    $scope.title = "Google Maps API v3";
}]);

app.directive("gmap", function () {
    'use strict';
    
    return function (scope, elm, attrs) {
        
        var map, options, showPosition, pin, store,
            iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        
        pin = function (label, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: label
            });
            
            map.setCenter(location);
        };
        
        store = function (label, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: label,
                icon: "/img/rice_0.png"
            });
        };
        
        showPosition = function (position) {
            
            var startPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                storePoint = new google.maps.LatLng(-30.044822402099168, -51.16358757019043);
            
            options =  {
                center: startPoint,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            map = new google.maps.Map(elm[0], options);
            
            google.maps.event.addListener(map, 'click', function(event) {
                console.log(event.latLng);
            });
            
            pin("You are here!", startPoint);
            store("My Store", storePoint);
        };
        
        navigator.geolocation.getCurrentPosition(showPosition);
    };
});