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
                        id: '=',
                        name: '=',
                        address: '=',
                        phoneNumber: '='
                    },
                    templateUrl: '/assets/partials/store-card.html',
                    replace: false,
                    controller: ['$scope', 'ReviewAPI',
                        function($scope, ReviewAPI) {
                            
                            /* ---------------------------------------------
                             | Directive's scope bound objects and functions
                             `------------------------------------------- */
                            
                            $scope.card = {
                                id: $scope.id,
                                name: $scope.name,
                                address: $scope.address,
                                phoneNumber: $scope.phoneNumber,
                                reviews: [],
                                averageNumStars: 0,
                                averageNumStarsForDisplay: 0,
                                currentUserReview: null,
                                currentView: 'info',
                                setView: function(view) {
                                    $scope.card.currentView = view;
                                },
                                submitReview: function() {
                                    var $review = $('div.new-review'),
                                        text = $review.find('[name=review-text]').val(),
                                        $starlist = $('.new-review .star-list'),
                                        numStars = $starlist.find('li').find('.fa-star').length;
                                    
                                    if (text && numStars) {
                                        ReviewAPI.addStoreReview($scope.card.id, text, numStars).then(function() {
                                            // TODO: Show confirmation that review was added, reload reviews
                                            ReviewAPI.getStoreReviews($scope.card.id).then(function(storeData) {
                                                $scope.card.reviews = storeData.reviews;
                                            });
                                        })
                                    } else {
                                        alert("You didn't review."); // TODO: Fix this
                                    }
                                }
                            };
                            
                            console.log($scope.card);
                            
                            /* ---------------------------------------------
                             | Initialization script
                             `------------------------------------------- */

                            ReviewAPI.getStoreReviews($scope.card.id).then(function(storeData) {
                                var i, totalStars = 0;
                                $scope.card.reviews = storeData.reviews;
                                
                                for (i = 0; i < storeData.reviews.length; i++) {
                                    totalStars += storeData.reviews[i].stars;
                                }

                                $scope.card.averageNumStars = totalStars / storeData.reviews.length;
                                $scope.card.averageNumStarsForDisplay = Math.round($scope.card.averageNumStars);
                            });
                            
                            // Attach all star rating functionality
                            (function() {
                                var $starlist = $('.new-review .star-list');

                                // Attach click events to star rating functionality
                                $starlist.click(function() {
                                    var $this = $(this);
                                    $this.toggleClass('locked');
                                }).find('li').hover(function() {
                                    var $this = $(this),
                                        $parent = $this.parent();

                                    if (!$parent.hasClass('locked')) {
                                        $this.prevAll().andSelf().children().
                                            removeClass('fa-star-o').
                                            addClass('fa-star');

                                        $this.nextAll().children().
                                            removeClass('fa-star').
                                            addClass('fa-star-o');
                                    }
                                });
                            })();
                        }
                    ]
                };
            }
        ]);
})();
