/*
 * This service is for calls to the internal API
 */

(function() {
    'use strict';

    angular.module('starredbucks').service('UserAPI', ['$http', 'PromiseService',
        function($http, PromiseService) {

            var BASE_URL = '/api/user/';

            this.signup = function(userInfo) {
                return PromiseService.processHttpResponse($http.post(BASE_URL + 'signup', userInfo));
            };

            this.login = function(userInfo) {
                return PromiseService.processHttpResponse($http.post(BASE_URL + 'login', userInfo));
            };
            
            this.logout = function() {
                return PromiseService.processHttpResponse($http.get(BASE_URL + 'logout'));
            };
            
            this.setZipcode = function(zipcode) {
                console.log("Setting zipcode to: " + zipcode);
                return PromiseService.processHttpResponse($http.post(BASE_URL + 'zip', zipcode));
            };
        }
    ]);

    angular.module('starredbucks').service('ReviewAPI', ['$http', 'PromiseService',
        function($http, PromiseService) {

            var BASE_URL = '/api/reviews/';

            this.getStoreReviews = function(storeId) {
                return PromiseService.processHttpResponse($http.get(BASE_URL + storeId));
            };
            
            this.addStoreReview = function(storeId, reviewText, numStars) {
                var data = {
                    'review_text': reviewText,
                    'num_stars': numStars
                };
                return PromiseService.processHttpResponse($http.post(BASE_URL + storeId, data));
            };
        }
    ]);

    angular.module('starredbucks').service('MapAPI', ['$http', 'PromiseService',
        function($http, PromiseService) {

            var BASE_URL = '/api/locations/';
            
            var dummyPoints = [{
                    id: 0,
                    name: "FakeLoc1",
                    lat: 43.031,
                    lng: -71.97
                }, {
                    id: 1,
                    name: "FakeLoc2",
                    lat: 41.821,
                    lng: -73.077
                }, {
                    id: 2,
                    name: "FakeLoc3",
                    lat: 41.582,
                    lng: -71.99
                }, {
                    id: 3,
                    name: "FakeLoc4",
                    lat: 41.81,
                    lng: -72.86
                }];

            /*
             * Get `count` stores within `radius` miles from `center` (lat, lng). A
             * count of -1 returns as many as are applicable. Note that there is a maximum
             * cap of 1000 stores in a single view.
             */
            this.getPoints = function(rad, center) {
                var lat = center[0],
                    lng = center[1];
                // var data = { count: count, radius: radius, center: center };
                // return PromiseService.processHttpResponse($http.get(BASE_URL, data));
                // return dummyPoints;
                console.log()
                return PromiseService.processHttpResponse($http.get(BASE_URL + rad + '/' + lat + '/' + lng));
            };
        }
    ]);
})();
