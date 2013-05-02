'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('HomePi App', function() {
 
  describe('Device list view', function() {
 
    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });
 
 
    it('should show the device list as user starts the app', function() {
      expect(repeater('.table tr').count()).toBe(4);
    });
  });
});