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

    application.controller('StarredBucksApp', ['$scope', 'UserAPI',
        function($scope, UserAPI) {

            /* ----------------------------------------------
            | Glocal wrapper for the StarredBucks application
            `--------------------------------------------- */
            $scope.sb = {
                userData: {
                    isLoggedIn: false,
                    username: "none"
                }
            };
        }
    ]);
})();
