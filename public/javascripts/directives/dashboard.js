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
                            
                            var confirmLoggedIn, addMarkerClickEvent, initializeMap, drawMap, resizeMap, geocoder,
                                mapDefaults = { lat: 43.031, lng: -71.97, zoom: 13 };

                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            
                            $scope.dashboard = {
                                mapId: 'starbucks-map',
                                greeting: "Hello!",
                                currentStoreId: 1,
                                zipcode: $cookieStore.get("zipcode"),
                                currentLocationString: "",
                                updateZipcode: function(event) {
                                    var zip, $zipcode, numPressed;

                                    // Get the input element that holds the zip
                                    $zipcode = $('[name=update-zipcode]');

                                    // Check to make sure it was a number press
                                    var key = event.keyCode || event.charCode;
                                    if (key >= 48 && key <= 57) {
                                        numPressed = key - 48;
                                        $zipcode.blur(); // Force an update on the paper-input element
                                        $zipcode.focus();
                                        $scope.dashboard.zipcode = $('[name=update-zipcode]').val() + numPressed;
                                    } else if (key === 13 || key === 27) {
                                        zip = $scope.dashboard.zipcode;
                                        if (zip.length === 5) {
                                            UserAPI.setZipcode({ 'zipcode': zip });
                                            geocoder.geocode( { 'address': zip }, function(results, status) {
                                                var newMapData;

                                                newMapData = {
                                                    lat: results[0].geometry.location.k,
                                                    lng: results[0].geometry.location.B,
                                                    location: results[0].geometry.location,
                                                    zoom: mapDefaults.zoom
                                                };

                                                // Update the current, user-facing location
                                                $scope.dashboard.currentLocationString = results[0].address_components[1].long_name;

                                                drawMap(newMapData);
                                            });
                                        }
                                    }
                                }
                            };

                            /* -----------------------------------
                             | Locally bound objects and functions
                             `--------------------------------- */
                            
                            /*
                             * There are some small bugs in the Google Maps API.
                             * Triggering a resize event on the map redraws the map
                             * to fit its bounding box.
                             */
                            resizeMap = function() {
                                google.maps.event.trigger($scope.dashboard.map, "resize");    
                            };

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
                                    var $storeCardContainer = $('.store-card-container'),
                                        storeCardParamsString = '';

                                    // Update the current store id and 
                                    $scope.dashboard.currentStoreId = marker.info.id;
                                    
                                    // Fade out then clear the existing store card
                                    $storeCardContainer.find('store-card').fadeOut('fast', function() {
                                        this.remove();
                                    });

                                    storeCardParamsString += ' id="\'' + marker.info.id + '\'" ';
                                    storeCardParamsString += ' name="\'' + marker.info.name + '\'" ';
                                    storeCardParamsString += ' address="\'' + marker.info.address + '\'" ';
                                    storeCardParamsString += ' number="\'' + marker.info.phone_number + '\'" ';
                                    
                                    // Add a new store-card onto the dashboard and fade it in
                                    $storeCardContainer.append($compile('<store-card style="display: none;"' + storeCardParamsString + '></store-card>')($scope));
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

                                lat  = mapData.lat  || mapDefaults.lat;
                                lng  = mapData.lng  || mapDefaults.lng;
                                zoom = mapData.zoom || mapDefaults.zoom;

                                $scope.dashboard.map = new google.maps.Map(document.getElementById($scope.dashboard.mapId), {
                                    center: new google.maps.LatLng(lat, lng),
                                    zoom: zoom
                                });

                                MapAPI.getPoints(numStores, [lat, lng]).then(function(data) {
                                    
                                    mapPoints = data.locations;
                                    
                                    console.log(mapPoints);
                                    
                                    // Construct a Google Maps marker with the JSON data, add
                                    // click events, and plot it on the map. Add the click event
                                    // and the marker to the map.
                                    for (i = 0; i < mapPoints.length; i++) {
                                        marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(mapPoints[i].lat, mapPoints[i].lng),
                                            map: $scope.dashboard.map,
                                            info: mapPoints[i]
                                        });
                                        addMarkerClickEvent(marker);
                                        marker.setMap($scope.dashboard.map);
                                    }
                                });
                            };

                            /*
                             * This calls the drawMap function on initial dashboard load, and defines
                             * the $scope bound map object.
                             */
                            initializeMap = function() {
                                geocoder.geocode( { 'address': $scope.dashboard.zipcode }, function(results, status) {
                                    var i = 0,
                                        initialMapData,
                                        interval;

                                    initialMapData = {
                                        lat: results[0].geometry.location.k,
                                        lng: results[0].geometry.location.B,
                                        zoom: mapDefaults.zoom
                                    };

                                    $scope.dashboard.currentLocationString = results[0].address_components[1].long_name;
                                    drawMap(initialMapData);

                                    // Note that this is fairly hackish and is not an ideal
                                    // solution to the Google Maps API redraw bug.
                                    interval = setInterval(function() {
                                        if (i++ === 5) {
                                            $scope.dashboard.map.setCenter(new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.B));
                                            $('.map-wrapper').addClass('in');
                                            clearInterval(interval);
                                        } else {
                                            resizeMap();
                                        }
                                    }, 500);
                                });
                            };

                            /* ---------------------------------------------------
                             | Initialization scripts
                             `------------------------------------------------- */
                            geocoder = new google.maps.Geocoder();
                            initializeMap();
                            
                            // Attach geolocation behavior
                            if (navigator.geolocation) {
                                $('.enable-geolocation').click(function() {
                                    console.log("Enabling geolocation");
                                    navigator.geolocation.getCurrentPosition(function(pos) {
                                        var newMapData, lat, lng;

                                        lat = pos.coords.latitude;
                                        lng = pos.coords.longitude;

                                        newMapData = {
                                            lat: lat,
                                            lng: lng,
                                            zoom: mapDefaults.zoom
                                        };

                                        // Update the current, user-facing location
                                        $scope.dashboard.currentLocationString = "Geolocation";
                                        drawMap(newMapData);
                                        
                                    }, function(err) {
                                        console.log("An error occurred");
                                    });
                                });
                            } else {
                                $('.enable-geolocation').hide();
                            }
                            
                            // navigator.geolocation.getCurrentPosition(function(d) { console.log(d) });
                        }
                    ]
                };
            }
        ]);
})();
