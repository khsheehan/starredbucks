/*
 * This directive holds the user dashboard
 */

(function() {
    'use strict';

    angular.module('starredbucks').
        directive('dashboard', [
            function() {
                return {
                    restrict: 'E',
                    scope: {
                        loggedIn: '='
                    },
                    templateUrl: '/assets/partials/dashboard.html',
                    replace: false,
                    controller: ['$scope', 'UserAPI', 'MapAPI', '$cookies', '$cookieStore', '$compile',
                        function($scope, UserAPI, MapAPI, $cookies, $cookieStore, $compile) {
                            
                            var confirmLoggedIn, addMarkerClickEvent;

                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            $scope.dashboard = {
                                mapId: 'starbucks-map',
                                greeting: "Hello!"
                            };

                            /* -----------------------------------
                             | Locally bound objects and functions
                             `--------------------------------- */

                            // This method can be run at any time as a safety precaution
                            // to determine whether or not a user is definitely logged in.
                            confirmLoggedIn = function() {
                                return ($cookieStore.get("username") && $cookieStore.get("username") === $scope.$parent.sb.userData.username && $scope.isLoggedIn);
                            };

                            addMarkerClickEvent = function(marker) {
                                google.maps.event.addListener(marker, 'click', function() {
                                    var $storeCardContainer = $('.store-card-container');

                                    // Fade out then clear the existing store card
                                    $storeCardContainer.find('store-card').fadeOut('fast', function() {
                                        this.remove();
                                    });

                                    // Add the new one
                                    $storeCardContainer.append($compile('<store-card style="display: none;" store-id="' + marker.storeId + '"></store-card>')($scope));
                                    $storeCardContainer.find('store-card').fadeIn('fast', function() {
                                       // No-op 
                                    });
                                });
                            };

                            /* ---------------------------------------------------
                             | Map specific functions, objects, constructors, etc.
                             `------------------------------------------------- */
                            var mapOptions, map, mapPoints, i, marker;

                            mapOptions = {
                                center: new google.maps.LatLng(-34.397, 150.644),
                                zoom: 8
                            };

                            map = new google.maps.Map(document.getElementById($scope.dashboard.mapId), mapOptions);
                            
                            // Load the initial map points
                            mapPoints = MapAPI.getPoints(0, 0, 0);
                            for (i = 0; i < mapPoints.length; i++) {
                                
                                // Construct a Google Maps marker with the JSON data
                                marker = new google.maps.Marker({
                                    storeId: mapPoints[i].id,
                                    position: new google.maps.LatLng(mapPoints[i].lat, mapPoints[i].lng),
                                    map: map,
                                    title: mapPoints[i].name
                                });

                                addMarkerClickEvent(marker);

                                // Add the marker to the map
                                marker.setMap(map);
                            }

                        }
                    ]
                };
            }
        ]);
})();
