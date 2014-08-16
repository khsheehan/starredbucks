/*
 * This service is used to handle / resolve any promise calls
 * made to any of the internal APIs.
 */

(function() {
    'use strict';

    angular.module('starredbucks').
        service('PromiseService', ['$q',
            function($q) {
                this.processHttpResponse = function(httpPromise) {
                    var deferred = $q.defer(),
                        wrappedPromise;

                    httpPromise.then(function(response) {
                        deferred.resolve(response.data);
                    }, function(response) {
                        var error = response.data;
                        if (typeof error.message !== 'undefined') {
                            deferred.reject(error.message);
                        } else {
                            deferred.reject(error);
                        }
                    });

                    wrappedPromise = deferred.promise;
                    wrappedPromise.abort = function() {
                        deferred.resolve(undefined);
                    };

                    return wrappedPromise;
                };
            }]);
})();
