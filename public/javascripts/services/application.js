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
        }
    ]);
})();
