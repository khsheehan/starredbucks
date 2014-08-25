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
                    controller: ['$scope', 'ReviewAPI',
                        function($scope, ReviewAPI) {

                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            
                            $scope.card = {
                                id: $scope.storeId,
                                name: null,
                                reviews: []
                            };
                            
                            /* ---------------------------------------------
                             | Initialization script
                             `------------------------------------------- */

                            ReviewAPI.getStoreReviews($scope.card.id).then(function(storeData) {
                                $scope.card.reviews = storeData.reviews;
                            });

                        }
                    ]
                };
            }
        ]);
})();
