var assert = require('chai').assert,
    List = require('../index').List;

describe('List', function() {
  it('should be instantiable and start with length 0', function() {
    var list = new List();
    assert(list.length() == 0);
  });

  describe('A List instantiated from an array', function() {
    var list = new List(['a', 'b', 'c']);
    it('should have the correct length', function() {
      assert(list.length() == 3);
    });

    it('should have the correct elements', function() {
      assert.equal(list.head(), 'a');
      assert.equal(list.tail().head(), 'b');
      assert.equal(list.tail().tail().head(), 'c');
    });
  });

  describe('.head()', function() {
    it('should thow an exception if the list is empty', function() {
      //(isaacbw) there must be a nicer way to do this
      var list = new List();
      var thrown = false;

      try {
	list.head();
      } catch (ex) {
	thrown = true;
      }

      assert(thrown);
    });
  });

  describe('.toArray()', function() {
    it('should prepend an element to the list', function() {
      var list = new List();
      assert.equal(list.prepend('a').head(), 'a');
    }); 
  });

  describe('.toArray()', function() {
    it('should convert a list into an array', function() {
      var list = new List([1, 2, 3]);
      assert.deepEqual(list.toArray(), [1, 2, 3]);
    });
  });

  describe('.tail()', function() {
    it('should return all but the first element', function() {
      var list = new List(['a', 'b', 'c']);
      assert.deepEqual(list.tail().toArray(), ['b', 'c']);
    });
  });

  describe('.concat()', function() {
    it('should return a new list with the elements of both lists', function() {
      var a = new List([1, 2, 3]);
      var b = new List(['a', 'b', 'c']);
      assert.deepEqual(a.concat(b).toArray(), [1, 2, 3, 'a', 'b', 'c']);
    });
  });

  describe('.last()', function() {
    it('should return the last element of the list', function() {
      assert.equal(new List([1, 2, 3]).last(), 3);
    });

    it('should thow an exception if the list is empty', function() {
      //(isaacbw) there must be a nicer way to do this
      var list = new List();
      var thrown = false;

      try {
	list.last();
      } catch (ex) {
	thrown = true;
      }

      assert(thrown);
    });
  });

  describe('.init()', function() {
    it('should return all but the last element of the list', function() {
      assert.deepEqual(new List([1, 2, 3]).init().toArray(), [1, 2]);
    });
  });
});
