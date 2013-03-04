'use strict';

/* jasmine specs for controllers go here */

describe('HomePi controllers', function() {
 
  describe('SwitchListCtrl', function(){
 
    it('should create "switches" model with 3 switches', function() {
      var scope = {},
          ctrl = new SwitchListCtrl(scope);
 
      expect(scope.switches.length).toBe(3);
    });
  });
});
