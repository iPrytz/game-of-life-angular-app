describe('appFooter component', function() {
  beforeEach(module('app', function($provide) {
    $provide.factory('appFooter', function() {
      return {
        templateUrl: 'app/footer.html'
      };
    });
  }));
  it('should render \'Isak Prytz\'', angular.mock.inject(function($rootScope, $compile) {
    var element = $compile('<app-footer></app-footer>')($rootScope);
    $rootScope.$digest();
    var footer = element.find('a');
    expect(footer.html().trim()).toEqual('Isak Prytz');
  }));
});
