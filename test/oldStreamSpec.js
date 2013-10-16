var assert = require('chai').assert,
    Stream = require('../lib/stream-old');

describe('Stream', function() {
  describe('.emptyStream', function() {
    it('creates an empty stream', function() {
      assert.equal(Stream.emptyStream().hasNext(), false);
    });
  });

  describe('.toStream', function() {
    it('creates a stream from an array', function() {
      var src = [1, 2, 3, 'a', 'b', 'c'];
      var itr = Stream.toStream(src);
      for(var i = 0; i < src.length; i++) {
	itr = itr.next();
	assert.equal(itr.value(), src[i]);
      }
    });
  });

  /*
  describe('.concat', function() {
    it('combines two streams into one', function() {
      var a = [1, 2, 3];
      var b = ['a', 'b', 'c'];
      var all = [1, 2, 3, 'a', 'b', 'c'];

      var itr = Stream.concat(Stream.toStream(a), Stream.toStream(b));

      for(var i = 0; i < all.length; i++) {
	itr = itr.next();
	assert.equal(itr.value(), all[i]);
      }
    });
  });
   */
});
