var should = require('should');
var canonify = require('../lib/main.js');

describe('canonify', function() {
  describe('null', function() {
    it('returns null', function() {
      var s = canonify(null);
      s.should.eql('null');
    });
  });
});
