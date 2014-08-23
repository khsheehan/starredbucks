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
                    controller: ['$scope', 'UserAPI', '$cookies', '$cookieStore', '$compile',
                        function($scope, UserAPI, $cookies, $cookieStore, $compile) {
                            
                            var setStateToLoggedIn;

                            /* --------------------------------------------
                            | Directive's scope bound objects and functions
                            `------------------------------------------- */
                            $scope.loginModal = {
                                currentView: 'login',
                                modalId: '#login-modal',
                                login: {
                                    username: null,
                                    password: null,
                                    login: function() {
                                        var username = $scope.loginModal.login.username,
                                            password = $scope.loginModal.login.password;

                                        UserAPI.login({username: username, password: password}).
                                            then(function(data) {
                                                setStateToLoggedIn(data);
                                                $(window).trigger('loadMap');
                                            }).
                                            catch(function() {
                                                // TODO: Implement some error handling
                                            });
                                    }
                                }, signup: {
                                    username: null,
                                    password: null,
                                    zipcode: null,
                                    signup: function() {
                                        var username = $scope.loginModal.signup.username,
                                            password = $scope.loginModal.signup.password,
                                            zipcode = $scope.loginModal.signup.zipcode;

                                        UserAPI.signup({username: username, password: password, zipcode: zipcode}).
                                            then(function(data) {
                                                setStateToLoggedIn(data);
                                                $(window).trigger('loadMap');
                                            }).
                                            catch(function() {
                                                // TODO: Implement some error handling
                                            });
                                    }
                                }, toggleView: function() {
                                    var view = $scope.loginModal.currentView === 'login' ? 'signup' : 'login';
                                    $scope.loginModal.currentView = view;
                                }
                            };

                            /* ----------------------------------
                            | Locally bound functions and objects
                            `--------------------------------- */
                            setStateToLoggedIn = function(data) {
                                var $dashboardContainer = $('.dashboard-container');

                                $cookieStore.put("username", data.username);
                                $cookieStore.put("zipcode", data.zipcode);
                                setTimeout(function() {
                                    $scope.$parent.$apply(function() {
                                        $scope.$parent.sb.userData.isLoggedIn = true;
                                        $($scope.loginModal.modalId).modal('hide');
                                    });
                                }, 1000);
                                
                                $dashboardContainer.append($compile('<dashboard></dashboard>')($scope));
                            };

                        }
                    ]
                };
            }
        ]);
})();
