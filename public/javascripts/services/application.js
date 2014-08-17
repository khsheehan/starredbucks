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
            }
        }
    ]);

    angular.module('starredbucks').service('MapAPI', ['$http', 'PromiseService',
        function($http, PromiseService) {

            var BASE_URL = '/api/map/';
            
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

            this.getPoints = function(count, radius, center) {
                return dummyPoints;
                // var data = { count: count, radius: radius, center: center };
                // return PromiseService.processHttpResponse($http.get(BASE_URL, data));
            };
        }
    ]);
})();
