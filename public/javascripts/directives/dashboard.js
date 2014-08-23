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
                    scope: { },
                    templateUrl: '/assets/partials/dashboard.html',
                    replace: false,
                    controller: ['$scope', 'UserAPI', 'MapAPI', 'ReviewAPI', '$cookies', '$cookieStore', '$compile',
                        function($scope, UserAPI, MapAPI, ReviewAPI, $cookies, $cookieStore, $compile) {
                            
                            var confirmLoggedIn, addMarkerClickEvent, initializeMap, drawMap,
                                mapDefaults = { lat: 43.031, lng: -71.97, zoom: 8 };

                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            
                            $scope.dashboard = {
                                mapId: 'starbucks-map',
                                greeting: "Hello!",
                                currentStoreId: 1,
                                zipcode: $cookieStore.get("zipcode")
                            };

                            /* -----------------------------------
                             | Locally bound objects and functions
                             `--------------------------------- */

                            /*
                             * This method can be run at any time as a pseudo-safety precaution. Note
                             * that this is not foolproof, and should only be used as a check in
                             * situations where a false positive would not be dangerous. For guaranteed
                             * confirmation of user state, use server-side logic instead.
                             */
                            confirmLoggedIn = function() {
                                return ($cookieStore.get("username") && $cookieStore.get("username") === $scope.$parent.sb.userData.username && $scope.isLoggedIn);
                            };

                            /*
                             * This function is used to attach click event behavior to
                             * markers as they are added to the map. Every time a new marker
                             * is added, the marker should be passed into this function to
                             * guarantee it functions properly.
                             */
                            addMarkerClickEvent = function(marker) {
                                google.maps.event.addListener(marker, 'click', function() {
                                    var $storeCardContainer = $('.store-card-container');

                                    // Update the current store id and 
                                    $scope.dashboard.currentStoreId = marker.storeId;

                                    // Fade out then clear the existing store card
                                    $storeCardContainer.find('store-card').fadeOut('fast', function() {
                                        this.remove();
                                    });

                                    // Add a new store-card onto the dashboard and fade it in
                                    $storeCardContainer.append($compile('<store-card style="display: none;" store-id="' + marker.storeId + '"></store-card>')($scope));
                                    $storeCardContainer.find('store-card').fadeIn('fast');                                    
                                });
                            };

                            /* ---------------------------------------------------
                             | Map specific functions, objects, constructors, etc.
                             `------------------------------------------------- */

                            /*
                             * This callback function is used to construct the map including
                             * getting initial map points, attaching click behavior to those
                             * points, then plotting them on the map.
                             * 
                             * @param startingPoint     This object contains references to the center point
                             *                          of the map along with zoom level information. This
                             *                          parameter should be used whenever possible, but there
                             *                          are defaults to fall back on.
                             */
                            drawMap = function(startingPoint) {
                                var lat, lng, zoom, mapOptions, mapPoints, i, marker,
                                    numStores = -1,
                                    radius    = 10,
                                    mapData   = startingPoint || {};
                                
                                console.log()

                                lat  = mapData.lat  || mapDefaults.lat;
                                lng  = mapData.lng  || mapDefaults.lng;
                                zoom = mapData.zoom || mapDefaults.zoom;

                                mapOptions = {
                                    center: new google.maps.LatLng(lat, lng),
                                    zoom: zoom
                                };

                                // TODO: Delete any existing maps if present
                                $scope.dashboard.map = new google.maps.Map(document.getElementById($scope.dashboard.mapId), mapOptions);

                                mapPoints = MapAPI.getPoints(numStores, radius, [mapDefaults.lat, mapDefaults.lng]);

                                // Construct a Google Maps marker with the JSON data, add
                                // click events, and plot it on the map. Add the click event
                                // and the marker to the map.
                                for (i = 0; i < mapPoints.length; i++) {
                                    marker = new google.maps.Marker({
                                        storeId: mapPoints[i].id,
                                        position: new google.maps.LatLng(mapPoints[i].lat, mapPoints[i].lng),
                                        map: $scope.dashboard.map,
                                        title: mapPoints[i].name
                                    });
                                    addMarkerClickEvent(marker);
                                    marker.setMap($scope.dashboard.map);
                                }
                            };

                            /*
                             * This calls the drawMap function on initial dashboard load, and defines
                             * the $scope bound map object.
                             */
                            initializeMap = function() {
                                var initialMapData = {}; // TODO: Get actual initial center point and zoom data

                                drawMap(initialMapData);
                            };

                            /* ---------------------------------------------------
                             | Initialization scripts
                             `------------------------------------------------- */
                            initializeMap();
                        }
                    ]
                };
            }
        ]);
})();
