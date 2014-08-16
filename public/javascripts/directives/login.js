/*
 * This directive holds the user signup box
 */

(function() {
    'use strict';
    
    angular.module('starredbucks').
        directive('loginBox', [
            function() {
                return {
                    restrict: 'E',
                    scope: { },
                    templateUrl: '/assets/partials/login-box.html',
                    replace: false,
                    controller: ['$scope', 'UserAPI', '$cookies', '$cookieStore',
                        function($scope, UserAPI, $cookies, $cookieStore) {
                            
                            $scope.login = {
                                username: null,
                                password: null
                            };
    
                            $scope.signup = {
                                username: null,
                                password: null
                            };
    
                            $scope.signup.signup = function() {
                                var username = $scope.signup.username,
                                    password = $scope.signup.password;
    
                                UserAPI.signup({username: username, password: password}).
                                    then(function(data) {
                                        // TODO: Close the login modal
                                        $cookieStore.put("username", data.username);
                                    }).
                                    catch(function() {
                                        // TODO: Implement some error handling
                                    });
                            };
    
                            $scope.signup.login = function() {
                                var username = $scope.login.username,
                                    password = $scope.login.password;
    
                                UserAPI.login({username: username, password: password}).
                                    then(function(data) {
                                        // TODO: Close the login modal
                                        $cookieStore.put("username", data.username);
                                    }).
                                    catch(function() {
                                        // TODO: Implement some error handling
                                    });
                            };
                        }
                    ]
                };
            }
        ]);
})();
