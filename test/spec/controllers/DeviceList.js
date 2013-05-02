'use strict';

describe('Controller: DeviceListCtrl', function () {

  // load the controller's module
  beforeEach(module('homePiApp'));

  var scope, ctrl, $httpBackend;
  var data = [{id: "0"},{id: "1"}];

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/devices').respond(data);
    scope = $rootScope.$new();
    ctrl = $controller('DeviceListCtrl', {
      $scope: scope
    });

  })); 


  it('should create "devices" model with 2 devices fetched from http', function() {
    $httpBackend.flush();
    console.log(scope.devices.length);
    expect(scope.devices.length).toBe(2);
  });


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});