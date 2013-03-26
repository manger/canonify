var should = require('should');
var canonify = require('../lib/main.js');

describe('canonify', function() {
  describe('null', function() {
    it('returns null', function() {
      canonify(null).should.eql('null');
    });
  });
  describe('true', function() {
    it('returns true', function() {
      canonify(true).should.eql('true');
    });
  });

  describe('false', function() {
    it('returns false', function() {
      canonify(false).should.eql('false');
    });
  });
  describe('false', function() {
    it('returns false', function() {
      canonify(false).should.eql('false');
    });
  });

  describe('empty array', function() {
    it('returns []', function() {
      canonify( [ ] ).should.eql('[]');
    });
  });
  describe('array', function() {
    it('returns array sans spacece', function() {
      canonify( [ 1, false , true,null ] ).should.eql('[1,false,true,null]');
    });
  });

  describe('-zero', function() {
    it('returns 0', function() {
      canonify(-0).should.eql('0');
    });
  });
  describe('zero', function() {
    it('returns 0', function() {
      canonify(+0.00E-3).should.eql('0');
    });
  });
  describe('int', function() {
    it('returns 1222333444555', function() {
      canonify(1.222333444555e12).should.eql('1222333444555');
    });
  });
  describe('huge', function() {
    it('returns x.xxxe+yyy', function() {
      canonify(0.622141500E24).should.eql('6.221415e+23');
    });
  });
  describe('fraction', function() {
    it('returns 0.xxx', function() {
      canonify(1.5e-5).should.eql('0.000015');
    });
  });
  describe('tiny', function() {
    it('returns 0.xxx', function() {
      canonify(-1.60217646E-019).should.eql('-1.60217646e-19');
    });
  });
  describe('2/3', function() {
    it('returns 0.6...', function() {
      canonify(2/3).should.eql('0.6666666666666666');
      // depends on size of float
    });
  });

  describe('string', function() {
    it('returns "Hello, World!"', function() {
      canonify('Hello, World!').should.eql('"Hello, World!"');
    });
  });
  describe('escapes', function() {
    it('returns \\x \\uxxxx', function() {
      canonify('\u0000\u0008\u0009\u000A\u000B\u000C\u000D\u0022\u005C')
        .should.eql('"\\u0000\\b\\t\\n\\u000b\\f\\r\\"\\\\"');
    });
  });
  describe('unicode', function() {
    it('returns unescaped chars', function() {
      canonify('\u00A7\u20AC\uD834\uDD1E').should.eql('"§€𝄞"');
    });
  });
  describe('surrogate', function() {
    it('uhmmm not sure what this should do', function() {
      canonify('\uDD1E').should.eql('"\udd1e"');
      canonify('\uD834').should.eql('"\ud834"');
    });
  });

  describe('empty object', function() {
    it('returns {}', function() {
      canonify( { } ).should.eql('{}');
    });
  });
  describe('object', function() {
    it('returns ordered keys', function() {
      canonify({c:1,b:2,a:3})
        .should.eql('{"a":3,"b":2,"c":1}');
    });
  });
  describe('object', function() {
    it('returns lexically ordered keys', function() {
      canonify({a:1, A:2, "":3, a1:4, "a\u0009":5})
        .should.eql('{"":3,"A":2,"a":1,"a\\t":5,"a1":4}');
    });
  });

  describe('object key with a toJSON method', function() {
    it('ignores toJSON on a string', function() {
      String.prototype.toJSON = function() {
        return 42;
      }
      canonify({"b":1,"a":2}).should.eql('{"a":2,"b":1}');
    });
  });
});
