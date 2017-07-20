/* global inject */

describe('myApp', () => {
  let element;
  let scope = {};

  beforeEach(module('templates'));
  beforeEach(() => {
    module('copayApp.directives');
    element = angular.element('<menu-toggle></menu-toggle>');
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();

      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('valid html', () => {
    console.log(scope.showPlugins = false);
    console.log(element.children());
    console.log(scope.showPlugins = true);
    console.log(element.children());

    expect(element.children()).toBeDefined();
  });
});
