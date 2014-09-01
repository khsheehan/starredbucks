describe('Dashboard', function () {
    var scope,
        directive;
    beforeEach(function () {
        module('starredbucks');
    });

    describe('dashboard', function () {
        beforeEach(inject(function ($rootScope, $directive) {
            scope = $rootScope.$new();
            directive = $directive('dashboard', {
                '$scope': scope
            });
        }));
        
        it('should run all appropriate initialization scripts', function() {
            expect(addMarkerClickEvent).toHaveBeenCalled();
            expect(resizeMap).toHaveBeenCalled();            
        });
        
        it('should fail a login check if the scoped logged-in variable is false', function() {
            scope.isLoggedIn = false;
            expect(confirmLoggedIn()).toBe(false);
        });
        
        it('should attach the geolocation click event if the browser supports it', function() {
            navigator.geolocation = true;
            expect($('.enable-geolocation').events().length()).toBe(1);
        });
        
    });
});
