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
                                reviews: [],
                                submitReview: function() {
                                    var $review = $('div.new-review'),
                                        text = $review.find('[name=review-text]').val(),
                                        numStars = $review.find('[name=review-stars]').val();
                                    
                                    if (text && numStars) {
                                        ReviewAPI.addStoreReview($scope.card.id, text, numStars).then(function() {
                                            // TODO: Show confirmation that review was added, reload reviews
                                            ReviewAPI.getStoreReviews($scope.card.id).then(function(storeData) {
                                                $scope.card.reviews = storeData.reviews;
                                            });
                                        })
                                    } else {
                                        alert("You didn't write a fucking review."); // TODO: Fix this
                                    }
                                }
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
