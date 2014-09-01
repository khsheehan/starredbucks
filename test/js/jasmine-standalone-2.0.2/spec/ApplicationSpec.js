describe('Application', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('starredbucks.Application');
    });

    describe('StarredBucksApp', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('StarredBucksApp', {
                '$scope': scope
            });
        }));
        
        it('removes the set username and sets isLoggedIn to false after logout', function () {
            scope.sb.userData.username = "test-username";
            scope.sb.userData.isLoggedIn = true;

            expect(scope.sb.userData.username).toBe('test-username');
            expect(scope.sb.userData.isLoggedIn).toBe(true);
            
            scope.sb.logout();

            expect(scope.sb.userData.username).toBe('');
            expect(scope.sb.userData.isLoggedIn).toBe(false);
        });
    });
});
