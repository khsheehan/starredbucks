/*
 * This directive holds the user dashboard
 */

(function() {
    'use strict';

    angular.module('starredbucks').
        directive('storeCard', [
            function() {
                return {
                    restrict: 'E',
                    scope: {
                        storeId: '='
                    },
                    templateUrl: '/assets/partials/store-card.html',
                    replace: false,
                    controller: ['$scope', 'UserAPI', 'MapAPI', '$cookies', '$cookieStore',
                        function($scope, UserAPI, MapAPI, $cookies, $cookieStore) {

                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            $scope.card = {
                                id: $scope.storeId,
                                name: null
                            };

                        }
                    ]
                };
            }
        ]);
})();
