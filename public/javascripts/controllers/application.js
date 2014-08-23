/*
 * application.js
 * 
 * This file contains the controller code for the
 * web application. It handles all top-level actions
 * associated with a user (signing up, logging in, etc.)
 * Most other actions are delegated to directives.
 */

(function() {
   
    'use strict';
    var application = angular.module("starredbucks.Application", ['starredbucks']);

    application.controller('StarredBucksApp', ['$scope', 'UserAPI', '$cookies', '$cookieStore',
        function($scope, UserAPI, $cookies, $cookieStore) {

            /* ----------------------------------------------
            | Glocal wrapper for the StarredBucks application
            `--------------------------------------------- */
            $scope.sb = {
                userData: {
                    isLoggedIn: false,
                    username: ""
                },
                
                /* The logout function will work independent of application state. The
                 * logout endpoint will always be hit and the cookies will be cleared.
                 * The code below that removes the 'dashboard' and 'store-card' are just
                 * to keep the DOM clean, as those elements will be hidden when the user
                 * is not logged in anyway.
                 */
                logout: function() {
                     
                    var $dashboardContainer = $('.dashboard-container'),
                        $storeCardContainer = $('.store-card-container');
                    
                    UserAPI.logout();
                    $cookieStore.remove("username");
                    $scope.sb.userData.username = "";
                    $scope.sb.userData.isLoggedIn = false;
                    $dashboardContainer.find('dashboard').remove();
                    $storeCardContainer.find('store-card').remove();
                }
            };
        }
    ]);
})();
