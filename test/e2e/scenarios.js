'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('HomePi App', function() {
 
  describe('Switch list view', function() {
 
    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });
 
 
    it('should show the switch list as user starts the app', function() {
      expect(repeater('.table tr').count()).toBe(3);
    });
  });
});